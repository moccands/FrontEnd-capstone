
import { getCountDown } from './js/nameChecker'
import { getHistDate } from './js/nameChecker'
import { getGeo, postData, getWeath, udpateUI } from './js/formHandler'

import './styles/header.scss'
import './styles/form.scss'
import './styles/base.scss'
import './styles/imagecity.scss'

export {
    getCountDown,
    getHistDate
}

 
const handleSubmit = async (e) => {
  e.preventDefault();

  const baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
  const apiUser = '&username=moccands';
  let formText = document.getElementById('name').value

  console.log("::: Form Submitted :::")

  if (formText) {
    getGeo(baseURL,formText, apiUser).
      then(function(data) {
        getWeath(data).
          then(function(dataWeath) {
            postData('http://localhost:8081/getImage', {data : formText }).then(function(res) {
              console.log(res)
              udpateUI(dataWeath,res.text)
             });
          });
      });
  }
};
  
document.getElementById("submitform").addEventListener("click", handleSubmit);
