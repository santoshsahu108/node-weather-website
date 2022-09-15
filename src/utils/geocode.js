const request = require('postman-request');

const geocode = (address,callback) => {
    const geoloc = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFkbWF4NzcxNCIsImEiOiJja2FveWw5MmcwaWVtMnVxbmRjMmFwcHZmIn0.l-rIkyQtAHKtYIqsFEjcRQ&limit=1';
    request({url : geoloc, json : true},(error,{body}) =>{
        if(error){
            callback("unable to connect location services...!",undefined);
            }else if (body.features.length === 0){
                callback("please provide location...!!!",undefined)
        
            }else{     
                
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports =  geocode