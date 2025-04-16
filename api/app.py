
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import json
from dotenv import load_dotenv
import serverless_wsgi

load_dotenv()

api_key = os.environ.get('APIKEY')

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
    url = f"https://gnews.io/api/v4/top-headlines?category=general&lang=en&country={country}&apikey={api_key}&from={date}T00:00:00Z&to={date}T23:59:59Z"
    print("URL:", url)

    response = requests.get(url)
    print("Response:", response)
    if response.status_code != 200:
        return jsonify({'error': f"Request failed with status code {response.status_code}"})
    
    data = response.json()
    print(jsonify(data['articles']))

    return jsonify(data['articles'])


# Handler for serverless app deployed on vercel
def handler(event, context):
    return serverless_wsgi.handle_request(app, event, context)


if __name__ == '__main__':
    app.run(debug=True)