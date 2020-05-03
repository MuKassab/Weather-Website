const request = require('request')


const geocodeFun = (location_name, callback) => {
    baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    location_name += ".json";
    token = "access_token=pk.eyJ1IjoibXVrYXNzYWIiLCJhIjoiY2s5bWV2ZmFzMDRzbTNlczBuNG5vNWgyMyJ9.4Pkwatd355qbtAAzHAy0Mg"
    options = "?limit=1&" + token
    reqURL = baseURL + encodeURIComponent(location_name) + options
    //console.log(reqURL)
    request({
        url:reqURL,
        json: true
    }, (error, response, body) => {
        if(error){
            callback("The geocode service is currently unavailable. Sorry :(", null)
        } else if(!body.features || body.features.length==0) {
            callback("The locations is not found.", undefined)
        }
        else {
            const obj = {name:body.features[0].place_name,
            lon: body.features[0].center[0],
            lat: body.features[0].center[1]}
            callback(undefined, obj)
        }
    })
}

module.exports = geocodeFun