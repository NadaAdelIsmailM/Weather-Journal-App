// Setup empty JS object to act as endpoint for all routes
projectData = {}; //APP API Endpoint

const port = 3000;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
// Start up an instance of cors
const corsInst = cors();
//configuring cors
app.use(corsInst);

// Initialize the main project folder
app.use(express.static('website'));


//POST Route
//The server side function should create a new entry in the apps endpoint (the named JS object) consisting of the data received from the client side POST.
app.post('/add', async function(req,res){
    const body = req.body;
    projectData = body;
    res.send(projectData);
})
//GET => GET Route I: Server Side
app.get("/content", async(req , res)=>{
    console.log(projectData);
    res.send(projectData);
})

// Setup Server
app.listen(port , listeningToPort );

function listeningToPort(){
    console.log("listening to port " + port);
}