const request = require('postman-request');


const forecast = (latitude,longitude,callback) =>{
    const we = 'http://api.weatherstack.com/current?access_key=25253e6b05c11ace9f86b53e7de75411&query='+latitude+','+longitude;
    request({url : we , json : true}, (error,{body}) =>{
        if(error){
            callback("unable to connect weather services...!",undefined);
            }else if (body.error){
                callback(body.error.info,undefined)
        
            }else{
                callback( undefined, 
                body.current.weather_descriptions[0]+". the temperature is "+body.current.temperature+"°C. and it's feel like "+body.current.feelslike+"°C."
                )
            }
        
        
    })
}

module.exports =forecast;