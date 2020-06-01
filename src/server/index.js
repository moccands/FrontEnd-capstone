var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

dotenv.config();
//var aylien = require('aylien_textapi');
/*var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });*/

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
    console.log(`Your API key is ${process.env.API_KEY}`);

})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/getImage',getImage);

async function getImage(req, res) {
    const  cityname  = req.body.data;

    const pixabayApiUrl = `https://pixabay.com/api/?key=${process.env.API_KEY}&q=${cityname}&image_type=photo&orientation=horizontal&category=travel`;
    try {
      const response = await axios.get(pixabayApiUrl)
      if(response) {
        console.log("res", response.data.hits[0].webformatURL);
        res.send({text: response.data.hits[0].webformatURL});
      }else {
        res.send({text:"error nothing found"});
      }
    }  
    catch(error) {
      console.log("error", error);
      res.send({text:"error Invalid request"});
    }
}