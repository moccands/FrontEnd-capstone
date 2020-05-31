

function getCountDown()   {

    let valDate = document.getElementById('date').value;
  
    let dateWheather = new Date();
  
    if (valDate) {
      dateWheather = new Date(valDate);
    }

  
    let datenow = new Date();
  
    const diffTime = (dateWheather - datenow);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
    return diffDays;
  
  }

function getHistDate(CountDown)  {
    const oneYearMs = 1000 * 60 * 60 * 24 * 365;
    const counDownMs = (1000 * 60 * 60 * 24 * (CountDown % 365));
    const onedayMs = 1000 * 60 * 60 * 24;

    let dateNow  = new Date();
    let dateHist = new Date(dateNow.getTime() + counDownMs);
    if (CountDown > 0) { // need to substract 1 year if the departure date is in the future 
        dateHist = new Date (dateHist.getTime()-oneYearMs);
    }

    let datehistTomo = new Date (dateHist.getTime()+onedayMs);

    let month = dateHist.getMonth()+1; // need to adjut months 0..11 so stupid
    let monthTomo = datehistTomo.getMonth()+1;

    let  dateHistFormat = dateHist.getFullYear() +'-'+month+'-'+ dateHist.getDate()
    let  dateHistRTomoFormat = datehistTomo.getFullYear() +'-'+monthTomo+'-'+ datehistTomo.getDate()

   return  '&start_date='+dateHistFormat+'&end_date='+dateHistRTomoFormat
}

export {  getCountDown, getHistDate }
