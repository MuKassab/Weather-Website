const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000


//Setup static directory path to serve
app.use(express.static(publicPath))

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {title: "Weather App", name: "Muhammad Kassab"})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Me', name:"Muhammad Kassab"})
})

app.get('/help', (req, res) => {
    res.render('help', {helpText: "Omg does it work?",
        title: 'Help',
        name: "Muhammad Kassab"})
})

app.get('/weather',(req, res) => {
    const address = req.query.address
    if(!address)
    {
        return res.send({
            error: "Please Provide an Address!"
        })
    }

    geocode(address, (error, {name, lon, lat} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(lat, lon, (error, {temp:temperature, desc:description}) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                city: name,
                temperature,
                description,
                search:address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {title: "Help", name: "Muhammad Kassab", message: "Help Article Not Found!"})
})



app.get('*', (req, res) => {
    res.render('error', {title: "Error 404", name: "Muhammad Kassab", message: "Page Not Found!"})
})

app.listen(port, () => {
    console.log("Starting! (Port : " + port +")")
})