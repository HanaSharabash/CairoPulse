import numpy as np
import pymongo
import os
import json
from area import area
from sklearn.cluster import KMeans
from operator import itemgetter

import matplotlib.pyplot as plt

print("Connecting to database...")
myclient = pymongo.MongoClient(
    "mongodb+srv://CairoPulse:CairoPulse@cluster0.538hc.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-qc2g1n-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
mydb = myclient["cairo_pulse"]
mycol = mydb["neighborhoods"]

neighbourhoods = []
for neigh in mycol.find({}, {"_id": 0}):
    neighbourhoods.append(neigh)

print("Successfully connected.")
weight = {"atms": 2, "banks": 2, "malls": 10, "bus_stations": 10, "cafes": 8, "churches": 4, "cinemas": 8,
          "bakery_pastry_shops": 10, "embassies_consulates": 4,
          "gas_stations": 2, "government_offices": 4, "gyms": 2, "beauty_salons": 4,
          "hospitals": 6, "medical_care": 6, "car_services": 2,
          "libraries": 4, "mosques": 4, "touristic_places": 6, "parkings": 2, "parks": 6, "pharmacies": 2,
          "hotels": 8, "clubs": 8,
          "police": 2, "restaurants": 8, "schools": 10, "universities": 10, "stores": 6, "subway_stations": 10,
          "supermarkets": 8}

samples = []  # representing neighbourhoods to be clustered
for neigh in neighbourhoods:
    wsum = 0
    sum = 0
    obj_area = {'type': 'MultiPolygon', 'coordinates': neigh["geometry"]["coordinates"]}
    area_neigh = area(obj_area)
    area_neigh /= 1000000
    for field in neigh:
        if field != "name_AR" and field != "name_EN" and field != "geometry" and field != "vibrancy":
            wsum += (weight[field] * len(neigh[field]))
            sum += len(neigh[field])
    samples.append(((sum / area_neigh), (wsum / area_neigh)))


###################################################################
# k-means:
X = np.array(samples)
kmeans = KMeans(n_clusters=7).fit(samples)
labels = kmeans.labels_

####################################################################
# plotting:

core_samples_mask = np.zeros_like(kmeans.labels_, dtype=bool)
n_clusters_ = len(set(labels))
unique_labels = set(labels)
colors = [plt.cm.Spectral(each)
          for each in np.linspace(0, 1, len(unique_labels))]
for k, col in zip(unique_labels, colors):
    if k == -1:
        # Black used for noise.
        col = [0, 0, 0, 1]

    class_member_mask = (labels == k)

    xy = X[class_member_mask & core_samples_mask]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(
        col), markeredgecolor='k', markersize=14)

    xy = X[class_member_mask & ~core_samples_mask]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(
        col), markeredgecolor='k', markersize=6)

plt.title('Estimated number of clusters: %d' % n_clusters_)
plt.show()

##################################################################
# Writing the resulting clusters together in the file result.json:

arr = []
for i in range(0, n_clusters_):
    arr.append([])
for i in range(0, len(labels)):
    arr[labels[i]].append(i)

arr2 = []
temp = []
for i in range(0, n_clusters_):
    temp.append([])


for i in range(0, len(arr)):
    for index in arr[i]:
        temp[i].append(neighbourhoods[index]["name_EN"])

    arr2.append((temp[i], kmeans.cluster_centers_[i][1]))

arr2 = sorted(arr2, key=itemgetter(1))
os.chdir("C:/Users/Mo'men Shoman/PycharmProjects/ML_Model")
resfile = open('result.json', 'w')
data = json.dumps(arr2)
resfile.write(data)
