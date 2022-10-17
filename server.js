const express = require('express');
const app = express();
const path = require("path");
const {fork} = require('child_process');
let startTime = new Date();
/**four hour in milliseconds */
let timeInMS = 144000;
let cityData = [];
//makes global middleware(which runs before the request/response made) - one time declaration is enough
app.use(express.static(path.join((__dirname),'/')))
//parse the incoming request to json format
app.use(express.json());
//fetch all the data of the city
app.get('/all-timezone-cities',(req,res)=>{
    let currentTime = new Date();
    if (currentTime - startTime > timeInMS) {
      startTime = new Date();
      const allTimeZones = fork('./child.js');
      //send message to child process
      allTimeZones.send({'message':'allTimeZone'});
      //listen to the response send by child process
      allTimeZones.on('message', (message) => {
        cityData=message;
        res.send(cityData)});
    } 
    //it runs at the first time when server starts and renders the data
    else {
      if (cityData.length === 0) {
        const allTimeZones = fork('./child.js');
        //send message to child process
        allTimeZones.send({'message':'allTimeZone'});
        //listen to the response send by child process
        allTimeZones.on('message', (message) => {
          cityData=message;
         // res.send(cityData)
        }); 
      }
      res.send(cityData);
    }
});
//fetch the time of selected city
app.get('/city',(req,res)=>{
  const city = fork('./child.js');
  //send message to child process
  city.send({message:'city',messagebody:req.query.city});
  //listen to the response send by child process
  city.on('message',(message)=>{res.send(message)});
});
//fetch the next five hours
app.post('/hourly-forecast',(req,res)=>{
  let nextFiveHours = req.body;
  let cityDateTime = nextFiveHours.city_Date_Time_Name;
  let hours = nextFiveHours.hours;
  const hourly_forecast = fork('./child.js');
  //send message to child process
  hourly_forecast.send({message:'hourly-forecast',messagebody:{cityDateTime:cityDateTime,
    hours:hours,
    citydata:cityData}});
    //listen to the response send by child process
  hourly_forecast.on('message',(message)=>{ res.send(message)});
});
//it prints error for invalid endpoints
app.get('*', function(req, res){
  res.status(404).send('404 File Not Found');
});

app.listen(5000);