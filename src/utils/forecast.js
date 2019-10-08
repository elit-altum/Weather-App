//Holds functions for sending location to dark sky

const request = require('request');

const forecast = (latitude, longitude, callback) => {

      const darkSkyURL = 'https://api.darksky.net/forecast/5189dbd8fad466f801403dc746535b5c/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';
      request({
            url: darkSkyURL,
            json: true,
      }, (error, response) => {

            if(error){
                  callback('Unable to connect to weather service. Check your internet connection', undefined);

            } else if (response.body.code) {
                  callback('Invalid location for request. Try another search', undefined);

            } else {
                  callback(undefined, {
                        summary: `${response.body.currently.summary} with a ${response.body.currently.precipProbability}% chance of rain`,
                        temperature: response.body.currently.temperature,
                        humidity: response.body.currently.humidity,
                        windSpeed: response.body.currently.windSpeed,
                        visibility: response.body.currently.visibility,

                  })
            }
      })
}

module.exports = forecast;
