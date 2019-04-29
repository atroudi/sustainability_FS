import numpy as np
import pandas as pd
import pickle
import psycopg2
import os
from celery import shared_task

@shared_task
def load_model2(month):
    print('loading model!')
    # loadmodel2()
    # total of crop demand
    total_monthly_crop_demand = 0
    OFFSET_LIMIT = 31  # we assume that the offset is a week

    file = 'Mukenis_Data.csv'
    if not month:
        startDateOffset = 0
    else:
        startDateOffset = int(month * 31)
    geolocation_id = 8
    location_label = "Irkhaya Farm"

    project_root = os.path.dirname(os.path.abspath(__file__))
    model_file_location = project_root + "/model2.pickle"

    print(model_file_location);
    # load the pre-trained multi-linear regression model
    with open(model_file_location, 'rb') as f:
        w_mat = pickle.load(f)

    # example of prediction with a list-type input
    # data = [[27.5, 65, 4.5]]
    #
    # for w in w_mat:
    #     print(np.dot(np.concatenate((np.matrix([1]*len(data)).T, np.array(data)), axis = 1), w)[0, 0])
    # Read a week input values fom database
    conn = psycopg2.connect("host=localhost dbname=biosustainabilitydb user=postgres password=root")
    cur = conn.cursor()

    # Free up field_prediction table
    try:
        cur.execute("delete from field_prediction")
    except (Exception, psycopg2.Error) as error:
        print("Error while emptying data from PostgreSQL", error)

    try:
        cur.execute(
            "Select temp_avg,humidity_avg,solar_radiation,water_loss,time from geolocation_records where geolocation_id=%d order by time LIMIT %d OFFSET %d" % (
                geolocation_id, OFFSET_LIMIT, startDateOffset))

        input_data = []
        water_loss_actual = []
        dates = []
        records = cur.fetchall()

        for row in records:
            tmp_temp_avg = row[0]
            tmp_humidity_avg = row[1]
            tmp_solar_radiation = row[2]

            # check if there is and input None
            if (tmp_temp_avg and tmp_humidity_avg and tmp_solar_radiation):
                input_data.append([tmp_temp_avg, tmp_humidity_avg, tmp_solar_radiation])
                water_loss_actual.append(row[3])
                dates.append(row[4])
            # print(input_data)
            # print(row)

    except (Exception, psycopg2.Error) as error:
        print("Error while fetching data from PostgreSQL", error)

    # example of prediction with a single input
    data = [27.5, 65, 4.5]
    id = 0
    print(input_data)

    # repeat for 4 weeks
    for j in range(3):
        for w in w_mat:
            predicted_water_loss = \
            np.dot(np.concatenate((np.matrix([1] * len(input_data)).T, np.array(input_data)), axis=1), w)[0, 0]

            # store values in Prediction table
            time = dates[id]
            tmp_temp_avg2 = input_data[id][0]
            tmp_humidity_avg2 = input_data[id][1]
            tmp_solar_radiation2 = input_data[id][2]
            actual_water_loss = water_loss_actual[id]
            total_monthly_crop_demand += actual_water_loss
            print("Predicted water loss: %f" % predicted_water_loss)
            print("Date " + str(dates[id]))
            print("Actual water loss: %f" % actual_water_loss)
            id += 1

            prediction_list = [id, time, tmp_temp_avg2, tmp_humidity_avg2, location_label, tmp_solar_radiation2,
                               predicted_water_loss, actual_water_loss, geolocation_id]
            try:
                cur.execute(
                    "INSERT INTO field_prediction (id, time, temp_avg, humidity_avg ,label, solar_radiation, water_loss, water_actual, geolocation_id ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    prediction_list
                )
            except (Exception, psycopg2.Error) as error:
                print("Error while inserting data into field_prediction table.", error)

    conn.commit()
    return total_monthly_crop_demand


# agent function for making the decision to buy/import the crop
# crop_demand (get as user input)
# local_water_requirement (get from forecast - monthly cumulative data)
# external_water_requirement (get from database as a 'Pandas DataFrame' - for now csv file from Sarah; monthly data)
# crop_inventory (get as user input - optional)
# country_facts (get from database as a 'Pandas DataFrame' - for now csv file from Sarah)
# month (get the month number depending on when the user queries the system; 0 for Jan, 1 for Feb, 2 for Mar etc.)

# in the end, the make_decision function returns (decision_flag, tmp_grow, tmp_import, crop_inventory, cost, env)
# the user will get the decision along with the amount grown and/or imported (tmp_grow, tmp_import) with the associated costs and environmental impact (cost, env);
# updated inventory (crop_inventory) after consumption will be tracked internally (not to shown on the display)
@shared_task
def import_crop(crop_demand, external_water_requirement, crop_inventory, country_facts, month, cost, env):
    external_water_requirement_row = external_water_requirement.loc[month, :]
    # print(external_water_requirement_row)
    external_water_requirement_row.sort_values(inplace=True)
    country_dict = dict()

    # initialize all countries with zero import
    for country in list(external_water_requirement_row.index):
        if not (":" in country):
            country_dict.update({country: 0})

    for country in list(external_water_requirement_row.index):
        row = country_facts[country_facts['Countries'] == country]
        tmp_import = row['Capacity'].values[0] * row['Percent_Export'].values[0] * (0.05 * np.random.rand() + 0.05)

        print("Amount imported from %s is %f" % (country, tmp_import))  # logging import info

        # store import
        country_dict.update({country: tmp_import})
        crop_inventory += tmp_import

        cost += tmp_import * row['Unit_Price'].values[0]

        # CO2 footprint for air transport is 0.85 kg CO2/km 0
        env += 0.85 * row['Distance'].values[0]

        if (crop_inventory > crop_demand):
            break
        else:
            continue

    return tmp_import, crop_inventory, cost, env, country_dict


# external_water_requirement
@shared_task
def make_decision(crop_demand, local_water_requirement, external_water_requirement, crop_inventory, country_facts,
                  month):
    cost = 0;
    env = 0;
    tmp_import = 0;
    tmp_grow = 0
    import_dict = dict()
    # Checks current inventory level
    if (crop_inventory < crop_demand):
        # minimum value of external water requirement
        min_cwr = min(external_water_requirement.loc[month, :])

        # Compares the CWR values
        if (local_water_requirement < min_cwr):  # this is for 'grow'
            # this value to be replaced later by Sarah
            tmp_grow = 2.1e6 * np.random.rand()
            crop_inventory += tmp_grow

            # Cost is USD 0.5/kg to grow tomatoes locally - to be checked by Sarah
            cost += tmp_grow * 0.5

            # CO2 footprint is 0.25 kg CO2/kg to grow tomatoes locally - to be checked by Sarah
            env += tmp_grow * 0.25

            if (crop_inventory < crop_demand):
                tmp_import, crop_inventory, cost, env, import_dict = import_crop(crop_demand,
                                                                                 external_water_requirement,
                                                                                 crop_inventory, country_facts, month,
                                                                                 cost, env)

                # Consumption update model assumed
                crop_inventory = 0.01 * crop_inventory
                return [3, tmp_grow, tmp_import, crop_inventory, cost, env]  # '3' means 'grow and import'

            else:
                # Consumption update model assumed
                crop_inventory = 0.01 * crop_inventory
                return [1, tmp_grow, tmp_import, crop_inventory, cost, env, import_dict]  # '1' means 'only grow'

        else:  # this is for 'import'
            # define the agent that you are dealing with on that specific time step
            tmp_import, crop_inventory, cost, env, import_dict = import_crop(crop_demand, external_water_requirement,
                                                                             crop_inventory, country_facts, month, cost,
                                                                             env)

            # Consumption update model assumed
            crop_inventory = 0.01 * crop_inventory

            return [2, tmp_grow, tmp_import, crop_inventory, cost, env, import_dict]  # '2' means 'only import'

    else:
        print("The current inventory of Qatar is sufficient to meet the local demand")
        tmp_grow = crop_demand
        tmp_import = 0

        # initialize all countries with zero import
        external_water_requirement_row = external_water_requirement.loc[month, :]

        for country in list(external_water_requirement_row.index):
            if not (":" in country):
                import_dict.update({country: 0})
        return [4, tmp_grow, tmp_import, crop_inventory, 0, 0, import_dict]  # '4' means 'do nothing'

@shared_task
def storeDecision(month, demand, results):
    print("Start storing!")

    # connect to database
    conn = psycopg2.connect("host=localhost dbname=biosustainabilitydb user=postgres password=root")
    cur = conn.cursor()

    print("Store decision")
    try:
        cur.execute(
            "INSERT INTO decision ( month, demand, decision_flag, tmp_grow, tmp_import, crop_inventory, cost, env ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            "ON CONFLICT (month) DO UPDATE SET demand = %s, decision_flag = %s, tmp_grow = %s, tmp_import = %s, crop_inventory = %s, cost = %s, env = %s",
            [month, demand] + results[:len(results) - 1] + [demand] + results[:len(results) - 1]
        )
    except (Exception, psycopg2.Error) as error:
        print("Error while inserting data into decision table.", error)


    imports_dict = results[-1]

    print("Store import countries")
    rank = 1
    for country in imports_dict:
        print(country, imports_dict[country])
        cur.execute(
            "INSERT INTO import_countries ( abbr, quantity_import, rank) VALUES (%s, %s, %s)"
            "ON CONFLICT (abbr) DO UPDATE SET quantity_import = %s, rank = %s",
            [country, imports_dict[country], rank] + [imports_dict[country], rank]
        )
        rank += 1


    # commit db connection
    conn.commit()


@shared_task
def decision(crop_demand):
    month = 1
    print("Start decision")
    project_root = os.path.dirname(os.path.abspath(__file__))
    demand = pd.read_csv(project_root + '/Demand.csv')
    country_facts = pd.read_csv(project_root + '/Country_Facts.csv')
    local_water_requirement = load_model2(1)
    print(local_water_requirement)
    crop_inventory = 0


    results = []
    print("make decision")

    results = make_decision(crop_demand, local_water_requirement, demand, crop_inventory, country_facts, month)

    # store results into crop table
    storeDecision(month, crop_demand, results)
    print(results)



if __name__ == "__main__":
    decision(1)