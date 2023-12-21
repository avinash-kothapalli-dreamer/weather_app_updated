const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')
const app =express()

//require("../public/js/app")

const port = process.env.PORT || 3000;

const publicpath =path.join(__dirname, '../public')
 const viewspath =path.join(__dirname, '../templates/views')
 const partialpath= path.join(__dirname,'../templates/partials')
app.use(express.static(publicpath))
hbs.registerPartials(partialpath)
app.set('views',viewspath)


app.set('view engine','hbs')
 app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Avinash'
    })
 })
 app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Avinash'
    })
 })
 app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'fetch weather from this app.',
        title:'Help',
        name:'Avinash'
    })
 })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error) return res.send({error})
        forecast(latitude,longitude,(error,temperature,condition,windspeed,wind_dir,pressure,precipitation,humidity,feelslike_c)=>{
             console.log('forecast')
             //console.log(forecastdata)
             console.log('temp',temperature)
             console.log('cond',condition)
             console.log('ws',windspeed)
             console.log('wind_dir',wind_dir)
             console.log('pressure',pressure)
             console.log('precip',precipitation)
             console.log('humidity',humidity)
             console.log('feelsliketemp',feelslike_c)
            if(error) return res.send({error})
            else{
                res.send({
                    location: location,
                    temperature:temperature,
                    condition:condition,
                   windspeed: windspeed,
                    wind_dir:wind_dir,
                    pressure:pressure,
                    precipitation:precipitation,
                    humidity:humidity,
                    feelslike_c:feelslike_c,

                    //temperarure_in_celsius:forecastdata.current.temp_c,
                    
                    //forecast:forecastdata,
                    address:req.query.address
                })
            }
        })
    })
   
})
app.get('/help/*',(req,res)=>{
   res.render('404',{
    name:'avinash',
        title:404,
        errormsg:"help article not found"
   })
})
app.get('*',(req,res)=>{
    res.render('404',{
        name:'avinash',
        title:404,
        errormsg:"page not found"
    })
})
app.listen(port,(req,res)=>{
    console.log('listening to the port = '+port)
})