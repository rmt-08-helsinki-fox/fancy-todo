const { Todo }= require('../models/index.js');
const axios = require("axios");
const sendGmail = require('../helpers/send-gmail');

class TodoController {

  static postTodos (req, res, next) {
    let { title, description, status, due_date } = req.body;
    let UserId = req.decoded.id;
    console.log(req.decoded, 'ini dari req decoded')
    let emailUser = req.decoded.email;
    Todo.create({title,description,status, due_date, UserId})
    .then((data)=> {
      console.log(emailUser, 'ini user email lhoo')
      sendGmail(emailUser, data)
      res.status(201).json(data)
    })
    .catch((err)=> {
      next(err);
    })
  }

  static getTodos (req, res, next) {
    let loggedUserId = +req.decoded.id;
    console.log('ini get todos', loggedUserId)
    Todo.findAll({
      where: {
        UserId: loggedUserId
      },
      order: [['id', 'DESC']]
    })
    .then(data => {
      console.log(data)
        res.status(200).json(data);
    })
    .catch(err => {
      next(err)
    })
  }

  static getTodoById (req, res, next) {
    let todoId = +req.params.id;
    Todo.findByPk(todoId)
    .then(data => {
      if (!data) {
        throw {
          name: "customError",
          msg: "Error not found",
          status: 404
        };
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      next(err);
    })
  }

  static putTodoById (req, res, next) {
    let todoId = +req.params.id;
    let { title, description, status, due_date } = req.body;

    Todo.update({ title, description, status, due_date }, {
      where: { id: todoId },
      returning: true
    })
    .then(data => {
      if (!data[0]) {
        throw {
          name: "customError",
          msg: "Error not found",
          status: 404
        };
      } else {
        console.log(data);
        res.status(200).json(data[1][0]);
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static patchTodoById (req, res, next) {
    let todoId = +req.params.id;
    let status = req.body.status;
    Todo.update({status},{
      where: { id: todoId },
      returning: true
    })
    .then(data => {
      if (!data[0]) {
        throw {
          name: "customError",
          msg: "Error not found",
          status: 404
        }; 
      } else {
      res.status(200).json(data[1][0]);
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static delTodoById (req, res, next) {
    let todoId = +req.params.id;
    Todo.destroy({
      where: { id: todoId }
    })
    .then((data) => {
      console.log(data);
      if (!data){ // if id not found data value is 0
        throw {
          name: "customError",
          msg: "Error not found",
          status: 404
        };
      } else {
        res.status(200).json({message: 'todo success to delete'})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static postWeather(req,res, next) {
    let city = req.body.city;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHERKEY}`)
      .then(weather => {
        console.log(weather)
        res.status(200).json(weather.data.weather)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports=TodoController;