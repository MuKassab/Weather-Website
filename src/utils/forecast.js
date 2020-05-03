const request = require('request')
const util = require('util')

/*const url = "http://api.weatherstack.com/current?access_key=72674059ff60258eb90d2ce8f2fd0e69&query=Cairo"
dataJSON = ""
request({
    url: url, json:true
}, (error, response, body) => {
    if(error){
        console.log("The weather service is currently unavailable. Sorry :(")
    } else if(body.error) {
        console.log("The locations is not found.")
    } else {
        console.log("It's currently " + body.current.temperature + " Deg. out there. (" + body.current.weather_descriptions[0] +")." )
    }
})*/

const forecast = (lat, lon, callback) => {
    baseURL = "http://api.weatherstack.com/current?"
    token = "access_key=72674059ff60258eb90d2ce8f2fd0e69"
    query = util.format('&query=%s,%s', lat, lon)
    url = baseURL + token + query
    //console.log(url)
    request({
        url, json:true
    }, (error, response, body) => {
        if(error){
            //console.log("The weather service is currently unavailable. Sorry :(")
            callback("The weather service is currently unavailable. Sorry :(", undefined)
        } else if(body.error) {
            console.log("The locations is not found.")
            callback("The locations is not found.", undefined)
        } else {
            console.log("It's currently " + body.current.temperature + " Degrees out there. (" + body.current.weather_descriptions[0] +")." )
            callback(undefined, {temp: body.current.temperature,
            desc: body.current.weather_descriptions[0]})
        }
    })
}

module.exports = forecast