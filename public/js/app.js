
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const firstMessage = document.querySelector('#message-1');
const secondMessage = document.querySelector('#message-2');
const errorHolder = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();

      secondMessage.textContent = 'Getting data...';
      firstMessage.textContent = '';
      errorHolder.textContent = '';


      let searchVal = search.value;
      let weatherURL = 'http://localhost:3000/weather?address=' + searchVal;

      fetch(weatherURL).then((res) => {
            res.json().then((data) => {

                  if (data.error) {
                        secondMessage.textContent = '';
                        errorHolder.textContent = 'Error: '+ data.error;
                        return;
                  }

                  firstMessage.textContent = data.location;
                  secondMessage.innerHTML = data.forecast + '.' + ' It is <b>' + data.temperature + '</b> degrees celsius.' + '<br><br><b>Humidity : </b> ' + data.humidity + '%' + '<br><b>Wind Speed :</b> ' + data.windSpeed + ' km/h' + '<br><b>Visibilty :</b> ' + data.visibility + ' km';
            });
      });

});