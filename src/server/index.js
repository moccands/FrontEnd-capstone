var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

dotenv.config();

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
    console.log('app listening on port 8081!')
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/getImage',getImage);

function getwebFormatURL(response){
  let txt 
  if(response.data.hits[0]) {
    console.log("res", response.data.hits[0].webformatURL);
    txt = response.data.hits[0].webformatURL;
  } else {
    txt = "error nothing found";
  }
  return txt
}

async function getImage(req, res) {
    const  cityname  = req.body.data;

    const pixabayApiUrl = `https://pixabay.com/api/?key=${process.env.API_KEY}&q=${cityname}&image_type=photo&orientation=horizontal&category=travel`;
    try {
      const response = await axios.get(pixabayApiUrl)
      res.send({text:getwebFormatURL(response)});
    }  
    catch(error) {
      console.log("error", error);
      res.send({text:"error Invalid request"});
    }
}