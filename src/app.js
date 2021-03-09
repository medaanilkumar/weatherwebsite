const express=require('express');
const path=require('path');
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const request=require('request')

const app=express()



// define paths for  express config
const staticpath=path.join(__dirname,'../public')
const partials=path.join(__dirname,'../views/partials')


//setup handlers barsengine 
app.set('view engine','hbs')
hbs.registerPartials(partials)
// setup static directory
app.use(express.static(staticpath))




app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'ANIL KUMAR'

    })
    
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Anil kumar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is useful for helping section  ',
        title:'helping section for weather',
        name:'anil kuamr'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'pls proide search term'
        })
    }
    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if(error)
        {
          return res.send(error)
        }
        forecast(latitude,longtitude,(error,fdata)=>{
            if(error)
            {
            return res.send(error)
            }
            res.send({
                forecast:fdata,
                location,
                address:req.query.address
            })
        })
    })
    })
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anilkumar',
        errormessage:'page article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Not found',
        name:'ANIL KUMAR',
        errormessage:'page not found'
    });
})
app.listen(3000,(req,res)=>{
    console.log('started');
})