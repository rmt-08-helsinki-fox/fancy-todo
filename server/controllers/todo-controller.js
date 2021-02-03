const { Todo } = require('../models/')
const axios = require('axios')
const WEATHERSTACK_API = process.env.WEATHERSTACK_API

class ControllerTodo {

  static showTodos(req, res, next) {
    Todo.findAll({
      order: [["id"]]
    })
    .then((todos) => {
      res.status(200).json(todos)
    })
    .catch(err => {
      next(err)
    })

  }

  static postTodos(req, res, next) {
    //didapat pada saat proses decoded
    let userId = req.userData.id

    //di client nnt ada field untuk input location(optional)
    const { title, description, status, due_date, location } = req.body
    
    let obj = { title, description, status, due_date, user_id: userId }
    
    let output = []

    Todo.create(obj)
    .then((todo) => {

      if(location) {
        output.push(todo)
        return axios
          .get(`http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API}&query=${location}`)
      }
      else {
        res.status(201).json(todo)
      }
    })
    .then(response =>{
      let currentWeather = response.data.current.weather_descriptions

      output.push(currentWeather)
      
      res.status(201).json(output)
    })
    .catch(err => {
    
      next(err)
    })
  }

  static showTodoById(req, res, next) {
    
    let todoId = +req.params.id

    Todo.findByPk(todoId)
    .then(() => { 
      //parameter kosong karena sudah di search di authorization,
      //data todo ambil dari req.todo pada saat authorization
      let findedTodo  = req.todo
      res.status(200).json(findedTodo)
    })
    .catch(err => {

      next(err)
    })
  }

  static putTodo(req, res, next) {

    let todoId = +req.params.id

    const { title, description, status, due_date } = req.body
    
    let obj = { title, description, status, due_date }

    //langsung diupdated karena findTodo sudah di authorization
    Todo.update(obj, {
      where: {
        id: todoId
      },
      returning: true
    })
    .then((updatedTodo) => {
      res.status(200).json(updatedTodo)
    })
    .catch(err => {
    
      next(err)
    })
    
  }

  static patchTodo(req, res, next) {

    let id = +req.params.id
    //jangan langsung passing req.body
    const  status  = req.body.status

    Todo.update({ status }, {
      fields: ['status'],
      where: {
        id
      },
      returning: true
    })
    .then(updatedTodo => {
      res.status(200).json(updatedTodo)
    })
    .catch(err => {

      next(err)
    })
  }

  static deleteTodo(req, res, next) {
    
    let todoId = +req.params.id
    
    Todo.destroy({
      where: {
        id: todoId
      }
    })
    .then(() => {
      
      res.status(200).json({ message: 'todo success to delete'} )
    })
    .catch(err => {

      next(err)
    })
  }
}

module.exports = ControllerTodo