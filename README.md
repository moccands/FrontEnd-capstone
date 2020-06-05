# FrontEnd capstone with Webpack Express

This travel app  will provide users with a weather forecast for the travel destination.

## features
* The user needs to enter the travel destination
* The user needs to enter a departure date. 
* [Depending on the selected date, data pullen by Geonames will be different. There are 3 set of data: 
1. The current day
2. If the departure date of the user is less than 16 days, then it's the forcasted date. 
3. If the departure date is more than 16 days then the historical date are used.]
* The data pulled by Geonames are used for Weatherbit. Weatherbit will give the weather forcast. Result will be shown in the dedicated field.
* By adding the final day of the trip a user can also see the lenght of the trip in the dedicated field. However, it's not an obligation. 
* Thanks to the information about the travel destination (Ex: Paris). It's possible to pull a picture from Pixabay. In Pixaby the travel category was selected. This was necessary to avoid picture that were not appropriate for the user. 

The website is responsive




## Additional feature to stand out
* Add end date and display length of trip


## Get Up and Running
- ```npm run build-prod``` to generate a dist folder for prod
- ```npm start``` to run the Express server on port 8081
- ```npm run test``` to run the tests on both server and client side
