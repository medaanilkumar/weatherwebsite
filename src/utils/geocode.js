const request=require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW5pbGt1bWFybWVkYSIsImEiOiJja2Z1d2R3ZHAwM3UwMzBxajd6aXNwNDZvIn0.TwAqFlZTVbBAbP-TzYLIxg&limit=5';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('connect to internet',undefined);
        }
        else if(body.features.length===0){
            callback('unable to find location',undefined);
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location:body.features[0].place_name

            })
        }
    })
}
module.exports=geocode