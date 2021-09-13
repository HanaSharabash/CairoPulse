from pymongo import MongoClient

client = MongoClient("put the database connection string here")
db = client.cairo_pulse

def get_neighborhoods_geometry () :
    return db.atms.find({})
