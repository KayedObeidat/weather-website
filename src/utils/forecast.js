const request = require('request')

const forecast = (latitude, longitude, callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=028f5ad7ca199cb1824371de3d0baee9&query=' + latitude + ','+ longitude + '&units=m'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] +  '. It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike + ' degrees out.' + 'The wind speed is  ' + body.current.wind_speed + ', and the humidity equals ' + body.current.humidity + '%')
        }
    }) 

}

module.exports = forecast