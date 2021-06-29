const request = require('request')
// const chalk = require('chalk')


const getWeather = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7de98e92547aeb4a10265b73dbad0276&query=' + lat + ',' + lon
    request({ url, json: true }, (error, response) => {
        console.log(response)
        if (error || !response || response.body.current == null) {
            // console.log(response)
            return callback('no weather obtained, error follows (check internet)', undefined)
        } else {
        // const data = response.body.current
        console.log(response.body)
        const {weather_descriptions:description, temperature, feelslike, weather_icons} = response.body.current
        const fFromC = (celcius) => Math.round(10*(celcius * 1.8 + 32))/10;
        callback(undefined, 'it is currently ' + description[0] + ' and ' + fFromC(temperature).toFixed(1) + '⁰F' + ', but it feels like ' + fFromC(feelslike).toFixed(1) + '⁰F!', weather_icons[0])
        }
    })
}

module.exports = getWeather