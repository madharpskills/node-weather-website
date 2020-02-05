const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/95424c535f854497cb2a2197ecac8e6e/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)
        
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        }
        else {
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability * 100
            const message = body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. There is a ' + precip + '% chance of rain.'
            callback(undefined, message)
        }
    })
}

module.exports = forecast