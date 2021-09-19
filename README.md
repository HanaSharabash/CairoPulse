# CairoPulse
Brief about the Project:
- The project targets the analysis of different urban indicators for the city of Cairo, such as traffic, sentiments, neighborhoods, vibrancy, safety, walkability, tourism attractions.
- Different sources of data will be planned and tapped into for data collection, then data filtration, processing, and integration will be performed.
- Urban data from multiple sources will be analyzed for insights. The analysis involves the incorporation of different metrics to measure urban indicators.
- Scalable backend platforms will be explored for data ingestion, storage, and processing, such as Kafka and Spark.
- Insights will be communicated via an interactive platform with visualizations (either web or mobile).

# Documentation
There were different phases throughout the project
## Phase 1: Data Collection
### In this phase we used Three methods of data collection:
##
### A- Web scrapping:
We needed to collect data about different points of interests (Landmarks, Hotels, Supermarkets , Places of worship , etc.)
Here are the resources that we used to collect the data.
### Hotels :
An existing web scraping apify actor was used to collect data about Hotels in Cairo and Giza from Booking.com .
Link to the apify actor : https://apify.com/dtrungtin/booking-scraper . 
Documentation for the actor is available in the same webpage.
### Police Stations :
We used Selenium web scraping library with python to get the data needed about various police stations around Cairo and Giza from https://www.yellowpages.com.eg/ . We were able to retrieve the name, address and location of the police station.
### Parks & Gas Stations :
We used OpenStreetMap to collect the data about parks and gas stations, we used their tool "Overpass Turbo" which provided the data needed in an easy way in the form of json or geojson files. The link to OverPass Turbo : https://overpass-turbo.eu/ .
### Hospitals & Pharmacies : 
We used Puppeteer, a web scrapping library with Node in JavaScipt to extract data about hospitals and pharmacies in Cairo. The data was extracted from https://www.yellowpages.com.eg/ and compiled into a json file which included names and addresses. 
###
### 

### B- Google APIs:
We needed to query the places API on the following points of interest:
* Atms
* Banks 
* Subway stations
* Bus stations
* Cafes
* Restaurants
* Cinemas
* Supermarkets
* Supermarkets
* Libraries
* Gyms
* Mosques
* Churches
* Landmarks
* Museums
* Drugstores
* Gas stations
* Governmental offices
* Hair care 
* Hardware Stores
* Parking
* Stores
* Police stations
* Schools 
* Parks
* Hospitals
###
The main problem with this method is that Google APIs limits its query results to 20 places only. So we couldn't use a nearby query thar will cover all the area of Cairo. In replace to that method, we split this query into sub-queries for each neighborhood in the 87 neighborhoods in the areas array bellow with a radius of 8Km. So this will cover most of the area, but it caused a duplication of results. 
```python
import googlemaps 

areas = {(' Bab el shaareya', 'Bab_el_shaareya'), (' El herafeyeen', 'El_herafeyeen'), (' El helmeya el gedidah', 'El_helmeya_el_gedidah'),
         (' Kotsika', 'Kotsika'), (' El zaher', 'El_zaher'), (' Kafr el elw', 'Kafr_el_elw'), (' Hadayek helwan', 'Hadayek_helwan'),
         (' Khan el khalili', 'Khan_el_khalili'), (' El sawah', 'El_sawah'), (' Aghakhan', 'Aghakhan'), (' Misr el kadima', 'Misr_el_kadima'),
         (' Shoubra', 'Shoubra'), (' Hamamat el kobba', 'Hamamat_el_kobba'), (' Kasr el ainy', 'Kasr_el_ainy'), (' Hadayek el kobba', 'Hadayek_el_kobba'),
         (' Road el farag', 'Road_el_farag'), (' Wadi houf', 'Wadi_houf'), (' Bab el louk', 'Bab_el_louk'), (' Nasr city', 'Nasr_city'),
         (' El mousky', 'El_mousky'), (' Boulak', 'Boulak'), (' El marg', 'El_marg'), (' El katameya', 'El_katameya'), (' Madinty', 'Madinty'), 
         (' El matareya', 'El_matareya'), (' El sayeda zeinab', 'El_sayeda_zeinab'), (' Ain shams', 'Ain_shams'), (' Maadi', 'Maadi'), 
         (' El zawia el hamra', 'El_zawia_el_hamra'), (' El sabteya', 'El_sabteya'), (' El zaytoun', 'El_zaytoun'), (' Saray el koba', 'Saray_el_koba'),
         (' El fustat', 'El_fustat'), (' Heliopolis', 'Heliopolis'), (' Abdin', 'Abdin'), (' Abbasseya', 'Abbasseya'), (' Wayli', 'Wayli'),
         (' Dar el salam', 'Dar_el_salam'), (' El hussein', 'El_hussein'), (' El salam city', 'El_salam_city'), (' Helmeyet el zaitoun', 'Helmeyet_el_zaitoun'),
         (' Downtown', 'Downtown'), (' El nozha el gadida', 'El_nozha_el_gadida'), (' Ramlet boulak', 'Ramlet_boulak'), (' Cairo suez rd.', 'Cairo_suez_rd'), 
         (' Al rehab city', 'Al_rehab_city'), (' Ain shams el gharbeya', 'Ain_shams_el_gharbeya'), (' Mokattam', 'Mokattam'), (' El manyal', 'El_manyal'), 
         (' Manial el roda', 'Manial_el_roda'), (' Helwan', 'Helwan'), (' Kebaa city', 'Kebaa_city'), (' Ataba', 'Ataba'), (' El sahel', 'El_sahel'), 
         (' El tebeen', 'El_tebeen'), (' El azbakeya', 'El_azbakeya'), (' Ain shams el sharkeya', 'Ain_shams_el_sharkeya'), (' New cairo', 'New_cairo'),
         (' Ezbet el nakhl', 'Ezbet_el_nakhl'), (' Tura', 'Tura'), (' El sakakiny', 'El_sakakiny'), (' Mounira', 'Mounira'), (' El amireya', 'El_amireya'),
         (' Bab el khalk', 'Bab_el_khalk'), (' Mansheyet nasser', 'Mansheyet_nasser'), (' El marg el gadida', 'El_marg_el_gadida'), 
         (' El koba el gadida', 'El_koba_el_gadida'), (' El darb el ahmar', 'El_darb_el_ahmar'), (' El roda', 'El_roda'), (' Azhar', 'Azhar'),
         (' Moassaset el zakah', 'Moassaset_el_zakah'), (' Qalaa', 'Qalaa'), (' El sharabeya', 'El_sharabeya'), (' El bassateen', 'El_bassateen'), 
         (' El gamaleya', 'El_gamaleya'), (' Sayeda aisha', 'Sayeda_aisha'), (' Zamalek', 'Zamalek'), (' El maasara', 'El_maasara'), (' Lazoughly', 'Lazoughly'), 
         (' Gesr el suez', 'Gesr_el_suez'), (' El darrasa', 'El_darrasa'), (' Hadayek el zaitoun', 'Hadayek_el_zaitoun'), (' Garden city', 'Garden_city'), 
         (' El khalifa', 'El_khalifa'), (' El sherouk city', 'El_sherouk_city'), (' Kobry el koba', 'Kobry_el_koba'), (' 15th of may city', '15th_of_may_city')}

maps = maps = googlemaps.Client(key = 'put google api key here')

#this code uses google geocoding API to get the center point of each neighborhood 

# for i in areas:
#    res = maps.geocode(address = i[0] ,region = "eg",language = "English")
#    with open("data/districts/"+i[1]+".json", 'w') as outfile:
#        json.dump(res, outfile)


for i in areas:

    f = open('data/districts/'+i[1]+'.json', "r")
    data = json.loads(f.read())
    location = data[0].get("geometry").get("location")

    res = maps.places_nearby(location = str(location.get("lat"))+","+str(location.get("lng")) ,radius = 8000,type = "tourist_attraction")
    with open("data/landmarks/"+i[1]+".json", 'w') as outfile:
       json.dump(res, outfile)

```
###
###
### C- Collecting the neighborhoods' geometry:







## Phase 2: Data filtration:
### In this phase we did the following pipeline process:

1. Grouping the data by the points of interest that the data of a specific point of interest is grouped from the data of 87 neighborhoods' data. 
2. Removing duplicates from the data collected
3. Removing unnecessary fields

## Phase 3: Database setup:
### 

## Phase 4: Machine learning model for clustering
#### The Objective:
The goal was to have different neighborhoods in Cairo having different level of `Vibrancy` based on urban indicators we collected in the data phase.
#### The Hypothesis:
We established the hypothesis that `Vibrancy` will be measured as `How Many people exist in this neighborhood per unit area`.
#### The Approach:
To calculate that We resembled the `number of people` as the number of points of interest in the neighborhood and gave them different weights according to type of the point of interest and how many people would exist there (e.g. The number of people at the mall is usually larger than the number of people at the gym so the weight of the mall to represent the number of people will be greater than that of the gym.).
We calculated this equation based on the weighted sum and divided by the area of the neighborhood to get the density per unit area and considered it to be the first feature to our neighborhoods.
The second feature was the same feature except we didn't give the points of interest any weights. That's to avoid some of the wrong weitghts that might have been assigned in a wrong way and we considered it to be the second feature of our neighborhoods.
#### The method & implementation:
We used `k-means` algorithm from `scikit learn` package in python to have 7 different clusters and we gave them levels of vibrancy according to the 2 features we had and what they represented (number of people per unit area in a neighborhood).
#### N.B.
The code including the wights of the points of interest and plotting of the data exists in the file `ML_code.py` and the result of the clustering is in `result.json`.

 
