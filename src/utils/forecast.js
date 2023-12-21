const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    console.log(latitude);
    console.log(longitude);
    const url =`http://api.weatherapi.com/v1/current.json?key=2ddbb41f499947ab9f171428221312&q=${latitude},${longitude}`
    console.log(url);
    
    request({url,json:true},(error,{body})=>{
        //console.log(body);
        if(error){
            callback("unable to connect weather device",undefined)
        }else if(body.error){
            callback("unable to find location",undefined)
        }else{
            //const abstemp = body.current.temperature;
            //const res = (abstemp- 32) * 5 / 9
            //const res1 =Math.round(res * 10) / 10; // Round to one decimal place

            

            callback(undefined,body.current.temp_c,body.current.condition.text,body.current.wind_mph,body.current.wind_dir,body.current.pressure_mb,body.current.precip_mm,body.current.humidity,body.current.feelslike_c)
        }
    })
}

module.exports=forecast