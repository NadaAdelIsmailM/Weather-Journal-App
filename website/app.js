/* Global Variables */
//-----------------API credentials-----------------//
/*Endpoint:
- Please, use the endpoint api.openweathermap.org for your API calls
- Example of API call:
api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0ebb14d7b1fad6d13c938020cc6af96f*/

// Personal API Key for OpenWeatherMap API
const myAPIKey = ",&APPID=0ebb14d7b1fad6d13c938020cc6af96f&units=imperial"; //-->Integrating OpenWeatherMap API

// the URL base.
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//----------------------------------------------//

/*The div with the id, entryHolder should have three child divs with the ids:

date
temp
content*/


//---------------HTML Elements-----------------//

//zip code from HTML.
const zip = document.getElementById('zip'); //The input element with the placeholder property set to “enter zip code here” should have an id of zip.
//feelings of user from HTML.
const feelings = document.getElementById('feelings');//The text area included in project HTML should have an id of feelings.
//temperature in HTML.
const temp = document.getElementById('temp');
//data in HTML.
const data = document.getElementById('data');
//feeling in content in HTML .
const content = document.getElementById('content');
// button to input data in HTML.
const generate = document.getElementById('generate'); //The button included in project HTML should have an id of generate.

//----------------------------------------------//


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add event listener to HTML button from DOM.

generate.addEventListener("click",GenerateBtnClicked); //In the file app.js, the element with the id of generate should have an addEventListener() method called on it, with click as the first parameter, and a named callback function as the second parameter.

function GenerateBtnClicked(){
    const fullURL = baseURL + zip.value + myAPIKey;
    //chaining
    GETData(fullURL).then(data =>{ ExtractData(data)
        .then(ExtractedData =>{  POSTData('/add' , ExtractedData)
            .then(() => { FetchingData("/content")
                .then(data =>{ UpdateDOM(data);
                });
            })
        })
    })
}

//get data from API => GET Route II: Client Side
const GETData = async(url)=>{
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// funcion that recieves data from GETdata()
const ExtractData = async(data)=>{
    const ExtractedData = { date : newDate, feelings: feelings.value, temp : data.main.temp };
    return ExtractedData;
}

//function post data to the device. => POST Route
//The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.
const POSTData = async(url="" , data ={})=>{
    const config ={  method:"POST",   credentials:"same-origin", headers: { Accept: 'application/json', 'Content-Type': 'application/json', },  body: JSON.stringify(data)};
    const FetechedData = await fetch(url,config);
    const res = await FetechedData.json();
    return res;
}

//function that gets data from the ServiceWorkerRegistration.
const FetchingData = async(url)=>{
    let response = {};
    await fetch(url).then(res => res.json()).then(data =>{console.log(data);  response = data;  });
    return response;
}




// updating the DOM to show data.
const UpdateDOM = async(data)=>{
    const response = await data;
    if (response.date){
        document.getElementById('date').innerHTML = response.date;
        document.getElementById('temp').innerHTML =  Math.round(response.temp)+ 'degrees' ;
        document.getElementById('content').innerHTML = response.feelings;
    } 
}