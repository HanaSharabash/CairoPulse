from pymongo import MongoClient

client =  MongoClient('put connection string here')
db = client['cairo_pulse']

