import requests
import json
import os


key = os.environ['DISTANCE_API_KEY']




def format_address(end):
    new = []
    for i in end.split():
        if i not in new and '#' not in i and 'apt' not in i.lower():
            new.append(i)
    end = " ".join(new)
    turl = f'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={end}&destinations={end}&key={key}'
    resp = requests.get(turl)
    x = json.loads(resp.content)
    return x['destination_addresses'][0].split(', ')


#85, 23


#67, 12
