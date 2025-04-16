# app.py
# ======== NOTE =========
# THIS FILE USED NEWSAPI WAS CREATED IN EARLY 2024
# NEWSAPI DOES NOT ALLOW FOR TOP HEADLINE SEARCHES BY DATE OR COUNTRIES BESIDES THE US ANYMORE
# =======================

# WIN:
# CREATE VIRTUAL ENV: `python -m venv venv`
# ACTIVATE THE CREATED VENV: `venv\Scripts\activate`
# SET ENV VARIABLES: `set SECRET_KEY=`
# INSTALL DEPENDENCIES: `pip install -r requirements.txt`
# RUN: `flask run`

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from newsapi import NewsApiClient

api_key = os.environ.get('SECRET_KEY')

# Init NewsAPI
newsapi = NewsApiClient(api_key=api_key)

app = Flask(__name__)
CORS(app)
    
@app.route('/articles', methods=['POST'])
def main():
    
    countries = ["ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "za", "zm", "zw"]
    
    # Get data from user
    print('Received request with data:', request.get_json())
    data = request.get_json()
    date = data['date']
    country = data['country']
    country = country.strip().lower()

    while len(country) != 2 or  not (country.isalpha()) or (not (country in countries)):
        return jsonify({'error': 'Invalid country code'}), 400
    
    # Get Articles
    # E.g: "https://newsapi.org/v2/top-headlines?country=us&from=2025-03-03&to=2025-03-03&apiKey=<API_KEY>
    url = f"https://newsapi.org/v2/top-headlines?country={country}&from={date}&to={date}&apiKey={api_key}"
    print("URL:", url)

    parameters = {
        'country': country,
        'from': date,
        'to': date,
        'sortBy': 'publishedAt',
        'apiKey': api_key
    }

    # top_headlines = newsapi.get_top_headlines(country=country,
    #     from_param=date, to=date, sortBy='publishedAt') 
    # print(top_headlines)

    # response = requests.get(url, params=parameters)
    response = requests.get(url)

    print(response)
    if response.status_code != 200:
        return jsonify({'error': f"Request failed with status code {response.status_code}"})
    
    data = response.json()
    print(data)
    return jsonify(data['articles'])


if __name__ == '__main__':
    app.run(debug=True)
