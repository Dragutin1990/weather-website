const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=49382d10ff8e40fd5ac7cc92c851ac3f&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            // console.log(body.current)
            callback(undefined, 'Weather: ' + body.current.weather_descriptions[0] + '. Temperature: ' + body.current.temperature +' C. Feels like: ' + body.current.feelslike + '. Humidity: ' + body.current.humidity + '%. Preassure: ' + body.current.pressure + ' mbar.')
        }   
        
    })

}


module.exports = forecast