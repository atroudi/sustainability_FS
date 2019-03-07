import os

from celery import shared_task
import pickle
import psycopg2
import numpy as np

@shared_task
def hello():
    print('Hello there!')

@shared_task
def load_model(week):
    print('loading model!')
    # loadmodel2()

    OFFSET_LIMIT = 8  # we assume that the offset is a week

    file = 'Mukenis_Data.csv'
    if not week:
        startDateOffset = 0
    else:
        startDateOffset = int(week * 8)
    geolocation_id = 8
    location_label = "Irkhaya Farm"

    project_root = os.path.dirname(os.path.abspath(__file__))
    model_file_location = project_root + "/model2.pickle"

    print(model_file_location);
    # load the pre-trained multi-linear regression model
    with open( model_file_location, 'rb') as f:
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
            if not (tmp_temp_avg and tmp_humidity_avg and tmp_solar_radiation):
                exit()
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
    for w in w_mat:
        predicted_water_loss = np.dot(np.concatenate((np.matrix([1]*len(input_data)).T, np.array(input_data)), axis = 1), w)[0, 0]

        # store values in Prediction table
        time = dates[id]
        tmp_temp_avg2 = input_data[id][0]
        tmp_humidity_avg2 = input_data[id][1]
        tmp_solar_radiation2 = input_data[id][2]
        actual_water_loss = water_loss_actual[id]
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
