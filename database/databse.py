import json

from bson import json_util
from pymongo import MongoClient
import re

client =  MongoClient('mongodb+srv://CairoPulse:CairoPulse@cluster0.538hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client['cairo_pulse']

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

