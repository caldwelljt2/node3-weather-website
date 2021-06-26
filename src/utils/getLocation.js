const request = require('request')
// const chalk = require('chalk')


const getLocation = (myPlace, callback) => {
    console.log('checking for ' + myPlace)
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(myPlace) + '.json?limit=2&access_token=pk.eyJ1IjoiY2FsZHdlbGxqdCIsImEiOiJja29rNzV3YzIwNThjMzFwZjU0dDEwMmVuIn0.cPa87gFkgx6_RcpaMoycGw&limit=1'
        request({ url: geocodeURL, json: true }, (error, response) => {
            if (error || !response) {
                return callback('no location obtained, check internet',undefined)
            } else if (!response.body.features[0]) {
                return callback('no location obtained, your search returned no valid place',undefined)
            } else {
                // console.log(response)
                // const data = response.body.features
                const location = response.body.features[0];
                callback(undefined, {
                    lat: location.center[1],
                    lon: location.center[0],
                    location: location.place_name
                })
                // console.log('You are checking for the weather in ' + chalk.yellow(location.place_name) + ' at lat ' + chalk.yellow(lat) + ' and lon ' + chalk.yellow(lon))
                // getWeather(lat,lon) 
            }
        
    })
}

module.exports = getLocation