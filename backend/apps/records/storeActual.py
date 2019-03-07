import csv
import psycopg2
from datetime import date, datetime
import calendar

import numpy as np
import pickle

OFFSET_LIMIT = 7 # we assume that the offset is a week

file = 'Mukenis_Data.csv'
startDateOffset = 0

# store current day and the one week water-loss actual values
# Will be called from records

if __name__ == '__main__':

    # load the pre-trained multi-linear regression model
    with open('model2.pickle', 'rb') as f:
        w_mat = pickle.load(f)
    
    # example of prediction with a list-type input
    # data = [[27.5, 65, 4.5]]
    #
    # for w in w_mat:
    #     print(np.dot(np.concatenate((np.matrix([1]*len(data)).T, np.array(data)), axis = 1), w)[0, 0])
    # Read input values fom database
    conn = psycopg2.connect("host=localhost dbname=biosustainabilitydb user=postgres password=root")
    cur = conn.cursor()

    cur.execute("Select * from geolocation_records where geolocation_id=8 order by time LIMIT %d OFFSET %d" % (OFFSET_LIMIT, startDateOffset))
    records = cur.fetchall()
    for row in records:
        print(row)

    # example of prediction with a single input
    data = [27.5, 65, 4.5]


    for w in w_mat:
        print(np.dot(np.concatenate((np.array([1]), np.array(data))), w)[0, 0])