import numpy as np
import pickle

if __name__ == '__main__':
    # load the pre-trained multi-linear regression model
    with open('model.pickle', 'rb') as f:
        w1 = pickle.load(f)

    # example of prediction with a list-type input
    data = [[27.5, 65, 4.5]]
    
    print(np.dot(np.concatenate((np.matrix([1]*len(data)).T, np.array(data)), axis = 1), w1)[0, 0])

    # example of prediction with a single input
    data = [27.5, 65, 4.5]

    print(np.dot(np.concatenate((np.array([1]), np.array(data))), w1)[0, 0])