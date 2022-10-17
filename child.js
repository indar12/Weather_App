let allTimeZoneCity = require("indrajith_timezone")
let fs = require('fs');
//listen message send by parent
process.on('message',message =>{
    try{
        if(!message.message){
            let date=new Date();
            throw new Error("Error: No endpoint message, time:"+date.toLocaleTimeString()+".");      
        }
        else{
            if(message.message=='allTimeZone'){
                let cityData =(allTimeZoneCity.allTimeZones());
                process.send(cityData);
            }
            else if(message.message=='city'){
                console.log(message.messagebody);
                if(!message.messagebody)
                {
                    let date=new Date();
                    throw new Error("Error: Null city selected, time:"+date.toLocaleTimeString()+".");
                }
                else{
                    let timeForOneCity = allTimeZoneCity.timeForOneCity(message.messagebody);
                    process.send(timeForOneCity);
                }  
            }
            else if(message.message=='hourly-forecast'){ 
                if(!message.messagebody){
                    let date=new Date();
                    throw new Error("Error: No citydata,time,hour, time:"+date.toLocaleTimeString()+".");
                }
                else if(!message.messagebody.cityDateTime)
                {
                    let date=new Date();
                    throw new Error("Error: No citydatetime, time:"+date.toLocaleTimeString()+".");   
                }
                else if(!message.messagebody.hours)
                {
                    let date=new Date();
                    throw new Error("Error: No hours, time:"+date.toLocaleTimeString()+".");
                }
                else if(!message.messagebody.citydata)
                {
                    let date=new Date();
                    throw new Error("Error: No citydata, time:"+date.toLocaleTimeString()+".");
                }
                else if(message.messagebody.cityDateTime&&message.messagebody.hours&&message.messagebody.cityDateTime)
                {
                    let futureTemperature = allTimeZoneCity.nextNhoursWeather(
                        message.messagebody.cityDateTime,
                        message.messagebody.hours,
                        message.messagebody.citydata
                      );
                    process.send(futureTemperature);
                }  
            }
        }
    }
    //get the error and insert into the file 
    catch(e){
        let errorData=e.message+"\n";
        fs.appendFile("logger.txt",errorData,()=>{console.log(e.message);});
        process.send(e)
    }
})