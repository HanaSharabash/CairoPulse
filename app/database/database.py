from pymongo import MongoClient

client = MongoClient("mongodb+srv://CairoPulse:CairoPulse@cluster0.538hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.cairo_pulse

def get_neighborhoods_geometry () :
    return db.atms.find({})
