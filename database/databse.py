import json

from bson import json_util
from pymongo import MongoClient
import re

client =  MongoClient('mongodb+srv://CairoPulse:CairoPulse@cluster0.538hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client['cairo_pulse']


def get_neighbourhoods():
    res = db.neighbourhoods.aggregate([{
        "$project" : {
            "name_EN" : 1,
            "name_AR" : 1,
            "geometry": 1,
            'vibrancy' : 1,
        }
    }])


    res = parse_json(list(res))

    geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    '_id': d['_id'],
                    'name_AR' : d['name_AR'],
                    'name_EN' : d['name_EN'],
                    'vibrancy' : d['vibrancy']
                },
                "geometry": d['geometry']

            } for d in res]
    }

    return geojson

def search_neighborhoods (search_key):
    regex = re.compile('^.*'+search_key+'.*$|^.*'+search_key[2:]+'.*$', re.IGNORECASE)
    res =   db.neighbourhoods.aggregate([{"$match":{"$or": [{"name_EN": {"$regex": regex}},{"name_AR": {"$regex": regex}}] } },
                                       {"$project":{
                                           "name_EN": 1,
                                           "name_AR": 1
                                       }},
                                        {
                                            "$limit":6
                                         }
                                       ])
    return parse_json(list(res))

def parse_json(data):
    return json.loads(json_util.dumps(data))

