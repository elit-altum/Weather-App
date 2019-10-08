//Holds function for handling mapbox API for geocoding

const request = require('request');

const geoCode = (address, callback) => {
      //add the place to URL in appropriate format
      let geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWxpdC1hbHR1bSIsImEiOiJjazEzb2ZrNGowYW5nM2RvNHkybW5wbzBqIn0.ddeLp7YJ-Ujkbeq8X78ugQ&limit=1';

      request({
            url: geoCodeURL,
            json: true,

      }, (error, response) => {     //records either error or data in the function arguments

            if (error) {
                  callback('Unable to connect to location service. Check your internet connection.', undefined);

            } else if (!response.body.features.length) {
                  callback('Unable to find location. Try another search.', undefined);

            } else {
                  callback(undefined, {
                        latitude: response.body.features[0].center[1],
                        longitude: response.body.features[0].center[0],
                        location: response.body.features[0].place_name,
                  });
            }
      });
}

module.exports = geoCode; //only exports a single function