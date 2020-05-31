
const baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const apiUser = '&username=moccands';
const whetheURLforecast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
const whetheURLcurrent ='https://api.weatherbit.io/v2.0/current?city=';
const whetheURLhistory ='https://api.weatherbit.io/v2.0/history/daily?';
const apiKey = '&key=f5f2b485731f46d4a6f668271c1b33e4'; // TODO put in env file

function udpateUI(dataWeath) {
    console.log("here")
    console.log(dataWeath);
    let descr = '';
    if (dataWeath.weather) {
      if (dataWeath.min_temp) {
        descr = dataWeath.weather.description+', ' + ' T Min: '+ dataWeath.min_temp + '[°], T Max: '+ dataWeath.max_temp + '[°]';
      }
      else {
        descr = dataWeath.weather.description+', ' + ' T Min: '+ dataWeath.temp + '[°]';
      }
    }
    else {
      descr = 'Typical Weather, Precip: '+ dataWeath.precip +'[mm], T Min: '+ dataWeath.min_temp + '[°], T Max: '+ dataWeath.max_temp + '[°]';
    }

    // TODO check temp instead max min for current

    document.getElementById('results').innerHTML =  descr
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    let countDown = Client.getCountDown()
    console.log(countDown)


    getGeo(baseURL,formText, apiUser).
      then(function(data){
        getWeath(data,countDown).
          then(function(dataWeath){
            postData('http://localhost:8081/analyseText', {data : formText }).then(function(res) {
              udpateUI(dataWeath)
             });
          });
      });
}



const getGeo = async (baseURL, city, key)=>{

  const res = await fetch(baseURL+city+key)
  try {
    const data = await res.json();
    console.log("res", data.postalCodes[0]);

    return data.postalCodes[0];
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const getWeath = async (data, countDown)=>{

  let lat = data.lat;
  let lon = data.lng;
  let url ;
  let arrayIndice = countDown;



  if (countDown == 0) {
    console.log("current");
    url = whetheURLcurrent+'&lat='+lat+'&lon='+lon+apiKey;
  }
  else if ((countDown > 0) && (countDown < 17)){
    console.log("forecast");

    url = whetheURLforecast+'&lat='+lat+'&lon='+lon+apiKey;
  }
  else {
    console.log("historical");
    let  datesToFrom = Client.getHistDate(countDown); 
    console.log(datesToFrom);
    url = whetheURLhistory+'&lat='+lat+'&lon='+lon+datesToFrom+apiKey;
    arrayIndice = 0; 
  }
  
  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log("array data", data.data);

    console.log("array[] data", data.data[arrayIndice]);

    return data.data[arrayIndice];
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
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
  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
}

export { handleSubmit }