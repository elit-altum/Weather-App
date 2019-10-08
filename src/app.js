//Core modules
const path = require('path');

//NPM modules
const express = require('express');
const hbs = require('hbs');

//Requiring self made files for geocode and weather
const geoCode = require('./utils/geocode'); //automatic extension is .js
const forecast = require('./utils/forecast');

//Stores the app made by express function
const app = express();

//Path modification for express setup
const publicDirectory = path.join(__dirname, '../public'); //concatenate path to public directory
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

//Setup to serve static assets in public folder
app.use(express.static(publicDirectory)); //Send the directory as static to server

//Setup to enable dynamic pages using hbs and their path
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

//Setting path to partials
hbs.registerPartials(partialsDirectory)

//Routes from app/server
//route to home 
app.get('', (req, res) => {

      res.render('index', {
            name: 'Manan Sharma',
            title: 'Weather@1.1.0',
            homeClassName: 'active',
            aboutClassName: '',
            helpClassName: '' ,
      });
});

//route to about page
app.get('/about', (req, res) => {

      res.render('about', {
            name: 'Manan Sharma',
            title: 'About Me',
            homeClassName: '',
            aboutClassName: 'active',
            helpClassName: '',
      });
});

//route to help page
app.get('/help', (req, res) => {

      res.render('help', {
            helpText: 'Welcome for tips and FAQ',
            name: 'Manan Sharma',
            title: 'Help Page',
            homeClassName: '',
            aboutClassName: '',
            helpClassName: 'active',
      });
});

//route to weather page
app.get('/weather', (req, res) => {
      if (!req.query.address) {
            return res.send({
                  error: 'Address not specified',
            });
      };

      geoCode(req.query.address, (error, locationData) => {

            if (error) {
                  return res.send({
                        error,
                  });
            };

            forecast(locationData.latitude, locationData.longitude, (error, forecastData) => {

                  if (error) {
                        return res.send({
                              error,
                        });
                  }

                  res.send({
                        address: req.query.address,
                        location: locationData.location,
                        forecast: forecastData.summary,
                        temperature: forecastData.temperature,
                        humidity: forecastData.humidity,
                        windSpeed: forecastData.windSpeed,
                        visibility: forecastData.visibility,
                  });
            });
      });
});

//route to 404 for help section
app.get('/help/*', (req, res) => {
      res.render('404', {
            title: '404: Page Not Found',
            name: 'Manan Sharma',
            error: 'Page not available. Go back to help.'
      });
});

//route to everything but above pages
app.get('*', (req, res) => {
      res.render('404', {
            title: '404: Page Not Found',
            name: 'Manan Sharma',
            error: 'Page not available.'
      })
});

app.listen(3000, () => {
      console.log('Server is running on port : 3000');
})