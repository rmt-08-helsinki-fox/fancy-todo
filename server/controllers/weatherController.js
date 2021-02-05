const { Todo } = require('../models');
const axios = require('axios');
const convertDate = require('../helpers/convertDate');

class WeatherController {
  
  static postForecastWeather(req, res, next) {
    const city = req.body.city;

    if (!city) throw { name: 'Error400', msg: 'You must enter the city name', status: 400 };
    
    const id = +req.params.id;
    let dueDateTodo;

    Todo.findByPk(id)
      .then(todo => {
        dueDateTodo = convertDate(todo.due_date);
        return axios({
          method: 'GET',
          url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_APIKEY}`
        })
      })
      .then(result => {
        let arrData = result.data.data;
        let foundData;

        arrData.forEach(data => {
          if (data.valid_date === dueDateTodo) {
            foundData = data;
          }
        })

        if (foundData) {
          res.status(200).json(foundData);
        } else {
          throw { name: 'Error400', msg: 'Sorry, weather prediction is not available yet', status: 400 };
        }

      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = WeatherController;