const express = require('express');
const request = require('postman-request');
const path = require('path');
const app = express();
const hbs = require('hbs');
const forecast = require('././utils/forecast.js');
const geocode = require('././utils/geocode.js');

// for heroku live port
const port = process.env.PORT || 3000;
// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handler bars and view location
app.set('view engine','hbs')
app.set("views", viewspath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))
// setup dynamic directory to serve
app.get('',(req,res) =>{
    res.render('index',{
        title : "weather app",
        name : "santosh sahu"
    })
    
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title : "about me",
        name : "santosh sahu"
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title : "help page",
        name : "santosh sahu"
    })
})  



app.get('/help/*',(req,res)=>{
    res.render("404",{
        title : "404",
        errormessage : "help article not found",
        name : "santosh sahu"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "please enter the address"
        });
    }else{
        geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
            if(error){
                return  console.log('error',error);
            }
           
           
        
        forecast(latitude,longitude,  (error, forecastdata) => {
            if(error){
                return console.log('error', error);
                
            }
            //console.log("location :", location)
            //console.log('Data', forecastdata)
            res.send({
                location : location,
                forecast : forecastdata,
                address : req.query.address
            })
          })
        })

  
    }

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : "please enter the value"
        });
    }else{
        
        res.send({
            products : []
        })
    }
   
    
})

app.get('*',(req,res)=>{
    res.render("404",{
        title : "404",
        errormessage : "page not found",
        name : "santosh sahu"
    })
})




app.listen(port,()=>{
    console.log("server is up on port 3000")
})