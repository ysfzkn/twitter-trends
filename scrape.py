
import numpy as np
import tweepy
import requests
import base64
import json
import schedule
import time
import datetime
import os
import csv


sayi = 0

def get_tweets():
        
    consumer_key = 'LqYfTFQm4xNYdTapk8nbLU8S2'
    consumer_secret = 'UstRhrp7wvnYATcXEEQODFV8g0rKvixCNZ4ifilnVNH5OOBhkR'

    key_secret = '{}:{}'.format(consumer_key, consumer_secret).encode('ascii')

    b64_encoded_key = base64.b64encode(key_secret)

    b64_encoded_key = b64_encoded_key.decode('ascii')


    base_url = 'https://api.twitter.com/'
    auth_url = '{}oauth2/token'.format(base_url)
    auth_headers = {
        'Authorization': 'Basic {}'.format(b64_encoded_key),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    auth_data = {
        'grant_type': 'client_credentials'
    }
    auth_resp = requests.post(auth_url, headers=auth_headers, data=auth_data)
    #print(auth_resp.status_code)
    access_token = auth_resp.json()['access_token']

    trend_headers = {
        'Authorization': 'Bearer {}'.format(access_token)    
    }

    # woeid of TR Istanbul
    trend_params = {
        'id': 2344116,
    }

    trend_url = 'https://api.twitter.com/1.1/trends/place.json'  
    trend_resp = requests.get(trend_url, headers=trend_headers, params=trend_params)

    tweet_data = trend_resp.json()
    # print(tweet_data)

    tweets = []
    for i in range(0,20):
        tweets.append(tweet_data[0]['trends'][i]["name"])

    #data = json.dumps(tweets)
    data = tweets

    print(data)
    # print(json.dumps(data))
    with open(f'public/data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

   

if __name__ == "__main__":
    
    
    #schedule.every(1).minutes.do(get_tweets)

    get_tweets()

    # while 1:
    #     schedule.run_pending()
    #     time.sleep(1)