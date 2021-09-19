import json
from bson import json_util , objectid
from bson.objectid import ObjectId
from pymongo import MongoClient
import re

client =  MongoClient('mongodb+srv://CairoPulse:CairoPulse@cluster0.538hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client['cairo_pulse']


fields = []
for i in list(db.neighborhoods.find_one({})):
    if not i in ['_id','name_AR','name_EN','geometry','vibrancy']:
        fields.append(i)



def get_neighbourhoods():
    res = db.neighborhoods.aggregate([{
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

    stringmissing = ''
    stringmore = ''

    for i in range(len(search_key)):
        stringmissing += '^.*' + search_key[0:i]+'.{1,2}'+search_key[i:len(search_key)]+'.*$|'
        if i == 0 :
            stringmore += '^.'+search_key[1:] +"$|"
        else:
            if i == len(search_key)-1 :
                stringmore +=  "^" + search_key[0 : len(search_key)-1] + ".$|"
            else:
                stringmore += "^" + search_key[0:i] + "." + search_key[i+1:] + "$|"
    stringmissing = stringmissing[0:len(stringmissing)-1]
    stringmore = stringmore [0:len(stringmore)-1]

    regex = re.compile('^.*'+search_key+'.*$|'+stringmissing+"|"+"^.{1,3}"+search_key[3:len(search_key)]+"$|"+stringmore, re.IGNORECASE)


    res =   db.neighborhoods.aggregate([{"$match": {
            "name_EN": {"$regex": regex}
    }},
                                       {"$project":{
                                           "name_EN": 1,
                                           "name_AR": 1
                                       }},
                                        {
                                            "$limit":6
                                         }
                                       ])


    return parse_json(list(res))



def get_categories (id):

    bsonid = ObjectId(id)

    x = {
                d : {"$size" : '$'+d } for d in fields
            }

    x.update({'name_EN':1})
    res = db.neighborhoods.aggregate([
        {
          "$match" : {"_id" : bsonid }
        },
        {
            "$project" : x
        }
    ])

    return parse_json(res)



def get_poi_data (id , poi ):

    neighborhood = db.neighborhoods.find_one({'_id':ObjectId(id)})
    res = db[poi].aggregate([
        {
            "$match": {
            "_id":{"$in": neighborhood[poi]}
            }
        },
        {
            "$project":{
                'name' : 1 ,
                'location' : 1
            }
        }
    ])
    return parse_json(res)


def parse_json(data):
    return json.loads(json_util.dumps(data))

