function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}


function getCountDown()   {

    let valDate = document.getElementById('date').value;
  
    let dateWheather = new Date();
  
    if (valDate) {
      dateWheather = new Date(valDate);
    } else {
      dateWheather = new Date();
    }
  
    //console.log(valDate);
  
    let datenow = new Date();
  
    const diffTime = (dateWheather - datenow);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    //console.log(datenow);
    //console.log(dateWheather)
    
  
    return diffDays;
  
  }

export { checkForName, getCountDown }
