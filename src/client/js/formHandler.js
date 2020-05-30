
const baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const apiUser = '&username=moccands';
const whetheURLforecast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
const whetheURLcurrent ='https://api.weatherbit.io/v2.0/current?city=';
const apiKey = '&key=f5f2b485731f46d4a6f668271c1b33e4'; // TODO put in env file

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
              console.log("here")
              console.log(dataWeath)
              document.getElementById('results').innerHTML = dataWeath.weather.description
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



  if (countDown == 0) {
    console.log("current");
    url = whetheURLcurrent;
  }
  else if (countDown < 17){
    console.log("forecast");

    url = whetheURLforecast;
  }
  else {
    console.log("historical");
  }
  
  const res = await fetch(url+'&lat='+lat+'&lon='+lon+apiKey);
  try {
    const data = await res.json();
    console.log("array data", data.data[countDown]);

    return data.data[countDown];
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