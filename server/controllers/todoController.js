const { Todo } = require('../models');
const axios = require('axios');
const convertDate = require('../helpers/convertDate');

class TodoController {
  static addTodo(req, res, next) {
    const { title, description, due_date } = req.body;
    Todo.create({
      title,
      description,
      due_date: new Date(due_date),
      userId: req.decoded.id
    })
      .then(todo => {
        res.status(201).json(todo);
      })
      .catch(err => {
        next(err);
      })
  }

  static getTodos(req, res, next) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        next(err);
      })
  }

  static getTodoById(req, res, next) {
    const id = +req.params.id;
    Todo.findOne({
      where: { id: id }
    })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateTodo(req, res, next) {
    const id = +req.params.id;
    const { title, description, due_date } = req.body;

    Todo.update({
      title,
      description,
      due_date: new Date(due_date)
    }, {
      where: { id },
      returning: true
    })
      .then(todo => {
        const updatedTodo = todo[1][0];
        
        res.status(200).json(updatedTodo);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateStatus(req, res, next) {
    const id = +req.params.id;
    const { status } = req.body;

    Todo.update({
      status
    }, {
      where: { id },
      returning: true
    })
      .then(todo => {
        const updatedTodo = todo[1][0];
        
        res.status(200).json(updatedTodo);
      })
      .catch(err => {
        next(err);
      })
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id;
    let deletedTodo;

    Todo.findByPk(id)
      .then(todo => {
        deletedTodo = todo;
        return Todo.destroy({
          where: { id }
        })
      })
      .then(lenTodo => {
        res.status(200).json({ delete_todo: deletedTodo, message: 'Successfully delete todo' });
      })
      .catch(err => {
        next(err);
      })
  }

  static getForecastWeather(req, res, next) {
    const city = req.query.city;
    
    if (!city) throw { name: 'CustomError', msg: 'You must enter the city name', status: 400 };
    
    const id = +req.params.id;
    let dueDateTodo;

    Todo.findByPk(id)
      .then(todo => {
        dueDateTodo = convertDate(todo.due_date);
        return axios({
          method: 'GET',
          url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.Weather_APIkey}`
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
          throw { name: 'CustomError', msg: 'Sorry, weather prediction is not available yet', status: 400 };
        }

      })
      .catch(err => {
        next(err);
      })
  }
  
}

module.exports = TodoController;