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
We needed to collect data about different points of interests (Landmarks, Hotels, Supermarkets , Places of worship , etc.)
Here are the resources that we used to collect the data.
### Hotels :
An existing web scraping apify actor was used to collect data about Hotels in Cairo and Giza from Booking.com .
Link to the apify actor : https://apify.com/dtrungtin/booking-scraper . 
Documentation for the actor is available in the same webpage.
### Police Stations :
We used Selenium web scraping library with python to get the data needed about various police stations around Cairo and Giza from https://www.yellowpages.com.eg/ . We were able to retrieve the name, address and location of the police station.
