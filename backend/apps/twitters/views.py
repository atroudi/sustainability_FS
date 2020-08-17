from rest_framework import viewsets
from .serializers import TwitterSerializer
from .models import Twitter
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, Http404, JsonResponse
import tweepy
from rest_framework.decorators import api_view



consumer_key = 'qhwg88DbtCpCG2hQumqSKj3qp'
consumer_secret = 'BZy237443Jj7hePJvSnRUFMePKCnrXVtEbhzXYQbDEwtUm8LQy'
access_token = '3315982002-w8V3IgrJWXKjNHuKjqMWOj7dGsTqG2rZaQSl91Y'
access_token_secret = 'LBkNkwRhZga9O3MokOIClPagFWGBx97DDo6RXvWFwqjrv'

# Twitter
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)

@api_view(["GET"])
def gettweets(request):
    tweets = []
    count=0
    print("getting tweets")
    for tweet in tweepy.Cursor(api.search,q="#" + request.GET.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(50):
        # print(tweet)
        print("getting tweet counter:" + str(count))
        count+=1
        temp = {}
        temp["text"] = tweet.full_text
        temp["username"] = tweet.user.screen_name
        # with graph.as_default():
        #     prediction = predict(tweet.full_text)
        temp["label"] = "label"
        temp["score"] = "score"
        tweets.append(temp)
    print(tweets)
    return JsonResponse({"results": tweets});

class TwitterViewSet(viewsets.ModelViewSet):
    serializer_class = TwitterSerializer
    queryset = Twitter.objects.all()
    search_fields = ('first_name', 'last_name', 'email')

