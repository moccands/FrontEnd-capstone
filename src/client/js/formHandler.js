//const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const apiKey = '&username=moccands';
const newZip = 10010;



function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")



      getZip(baseURL,formText, apiKey).then(function(data){
        postData('http://localhost:8081/analyseText', {data : formText }).then(function(res) {
          document.getElementById('results').innerHTML = res.polarity
       });
      })
}

const getZip = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    console.log("res", data.postalCodes[0]);

    return data;
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