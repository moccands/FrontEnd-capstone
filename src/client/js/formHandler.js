const whetheURLforecast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
const whetheURLcurrent ='https://api.weatherbit.io/v2.0/current?city=';
const whetheURLhistory ='https://api.weatherbit.io/v2.0/history/daily?';
const apiKey = '&key=f5f2b485731f46d4a6f668271c1b33e4'; // TODO put in env file
const urlholiday = './src/client/img/817bd68b656a64e2863275dd4ffc2b48.jpg';

import { getTripLength, getCountDown } from './nameChecker'

function udpateUI(dataWeath, cityImg) {
    console.log("here")
    console.log(dataWeath);
    let urlimg =  urlholiday;
    let descr = '';
    let temp1 = '';
    let temp2 = '';

    if(!dataWeath) {
      descr = "could not get any forecast";
    } else if (dataWeath.weather) {
      if (dataWeath.min_temp) {
        descr = dataWeath.weather.description;
        temp1 = ' T Min: '+ dataWeath.min_temp +' [°]';
        temp2 =  'T Max: '+ dataWeath.max_temp + ' [°]';
      }
      else {
        descr = dataWeath.weather.description;
        temp1 = ' T actual: '+ dataWeath.temp + ' [°]';
      }
    }
    else {
      descr = 'Typical Weather:  Precip: '+ dataWeath.precip +' [mm]';  
      temp1 = 'T Min: '+ dataWeath.min_temp + ' [°]';  
      temp2 = 'T Max: '+ dataWeath.max_temp + ' [°]';
    }
    document.getElementById('resultW').innerHTML =  descr;
    document.getElementById('resultT1').innerHTML =  temp1;
    document.getElementById('resultT2').innerHTML =  temp2;


    if (cityImg) {
      if (!cityImg.includes("error")) {
        urlimg = cityImg
      }
    }
    document.getElementById("cityimg").src = urlimg;

    document.getElementById("lengthoftrip").innerHTML = getTripLength();
}




const getGeo = async (baseURL, city, key)=>{

  const res = await fetch(baseURL+city+key)
  try {
    const data = await res.json();
    console.log("res", data.postalCodes[0]);

    return data.postalCodes[0];
  }  catch(error) {
    console.log("error", error);
  }
}

const getWeath = async (data)=>{

  let lat = data.lat;
  let lon = data.lng;
  let url ;
  const countDown = getCountDown(new Date());
  let arrayIndice = countDown;

  if (countDown == 0) {
    //console.log("current");
    url = whetheURLcurrent+'&lat='+lat+'&lon='+lon+apiKey;
  }
  else if ((countDown > 0) && (countDown < 17)){
    //console.log("forecast");
    url = whetheURLforecast+'&lat='+lat+'&lon='+lon+apiKey;
  }
  else {
    //console.log("historical");
    let  datesToFrom = Client.getHistDate(countDown); 
    url = whetheURLhistory+'&lat='+lat+'&lon='+lon+datesToFrom+apiKey;
    arrayIndice = 0; 
  }
  
  const res = await fetch(url);
  try {
    const data = await res.json();
    let resultWeather;
    if (data.data){
      //console.log("array[] data", data.data[arrayIndice]);
      resultWeather = data.data[arrayIndice];
    }
  
    return resultWeather;
  }  catch(error) {
    console.log("error", error);
  }
}


const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  } catch(error) {
    console.log("error", error);
  }
}

export { getGeo, postData, getWeath, udpateUI }