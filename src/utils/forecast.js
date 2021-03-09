//const { error } = require('console');
const request=require('request');
const forecast=(latitude,longtitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=40684cdcacf5634f4df1c0e70fe4a22d&query='+latitude+','+longtitude;
request({url:url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect',undefined);
    }
    else if(body.error)
    {
        callback('pls gie correct details',undefined);
    }
    else{
        callback(undefined,'The temperature is '+body.current.temperature+' deg out'+' at '+body.location.country);
    }
})
}
module.exports=forecast 