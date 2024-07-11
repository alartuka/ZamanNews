"""
A python program of ZamanNews-operates in the terminal 
"""


import requests
import os

contries = ["ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "za", "zm", "zw"]
api_key = os.environ.get('SECRET_KEY') 

def main(country, date):
    url = "https://newsapi.org/v2/top-headlines"
    parameters = {
        'country': country,
        'from': date,
        'to': date,
        'sortBy': 'publishedAt',
        'apiKey': api_key
    }
    response = requests.get(url, params=parameters)
    print(">>> STATUS CODE:", response.status_code)
    if response.status_code != 200:
        print(f"Request failed with status code {response.status_code}")
        return
    data = response.json()    
    return data['articles']

if __name__ == "__main__":
    country = input("Country (2-Letter code): ")
    date = input("Past Date -within 1 month of today- (YYYY-MM-DD): ")
    while len(country) != 2 or  not country.isalpha() or not (country.lower() in contries):
        print('Invalid country code')
        break 
    print(">>> ARGUMENTS: ", country, '|', date)
    articles = main(country, date)    
    print(">>> ARTICLES ON ", date,  " IN ", country.upper(), "=>")
    print(articles)



