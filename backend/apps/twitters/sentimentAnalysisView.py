from django.http import HttpResponse, Http404, JsonResponse
import tweepy
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from rest_framework.decorators import api_view
import os
import pickle

consumer_key = 'qhwg88DbtCpCG2hQumqSKj3qp'
consumer_secret = 'BZy237443Jj7hePJvSnRUFMePKCnrXVtEbhzXYQbDEwtUm8LQy'
access_token = '3315982002-w8V3IgrJWXKjNHuKjqMWOj7dGsTqG2rZaQSl91Y'
access_token_secret = 'LBkNkwRhZga9O3MokOIClPagFWGBx97DDo6RXvWFwqjrv'

# Keras stuff
global graph
graph = tf.get_default_graph()
project_root = os.path.dirname(os.path.abspath(__file__))
model = load_model(project_root + '/resources/Sentiment_CNN_model.h5')
MAX_SEQUENCE_LENGTH = 300

# Twitter
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)

# loading tokenizer
with open(project_root + '/resources/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def predict(text, include_neutral=True):
    print("performing prediction")
    # Tokenize text
    x_test = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=MAX_SEQUENCE_LENGTH)
    # Predict
    score = model.predict([x_test])[0]
    if(score >=0.4 and score<=0.6):
        label = "Neutral"
    if(score <=0.4):
        label = "Negative"
    if(score >=0.6):
        label = "Positive"

    return {"label" : label,
        "score": float(score)}

@api_view(["GET"])
def getSentiment(request):
    tweets = []
    count=0
    positive = 0
    neutral = 0
    negative = 0
    print("getting tweets")
    for tweet in tweepy.Cursor(api.search,q="#" + "covid19" + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(50):
        # print(tweet)
        print("getting tweet counter:" + str(count))
        count+=1
        temp = {}
        temp["text"] = tweet.full_text
        temp["username"] = tweet.user.screen_name
        with graph.as_default():
            prediction = predict(tweet.full_text)
        temp["label"] = prediction["label"]
        temp["score"] = prediction["score"]
        tweets.append(temp)

        if (prediction["label"] == "Positive"):
            positive += 1
        if (prediction["label"] == "Neutral"):
            neutral += 1
        if (prediction["label"] == "Negative"):
            negative += 1

    return JsonResponse({"positive": positive, "neutral": neutral, "negative": negative, "results": tweets});