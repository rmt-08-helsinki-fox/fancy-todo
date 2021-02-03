const { Todo, User } = require("../models")
const axios = require("axios")
const WEATHERKEY = process.env.WEATHERKEY
class Todo2 {

    static getTodo(req, res, next) {
      let userid = req.decoded.id
      Todo.findAll({where: {UserId:userid}})
        .then(todoList => {
          res.status(200).json(todoList)
        })
        .catch(err => {
          next(err)
        })
    }

    static postTodo(req,res, next) {
      let UserId = req.decoded.id
      const { title, description, status, due_date} = req.body
      const newTodo = {
        title,
        description,
        status,
        due_date,
        UserId
      }
      Todo.create(newTodo)
        .then(newTodo1 => {
          res.status(201).json(newTodo1)
        })
        .catch(err => {
          next(err)
        })
    }

    static getTodoId(req, res) {
      let id = +req.params.id
      Todo.findOne({where:{id:id}})
        .then(TodoId => {
            res.status(200).json(TodoId)
        })
        .catch(err => {
          next(err)
        })
    }

    static putTodoId(req, res, next) {
      let UserId = req.decoded.id
      let id = +req.params.id
      const { title, description, status, due_date } = req.body
      const newTodo = {
        title,
        description,
        status,
        due_date,
        UserId
      }
      Todo.update(newTodo,
        {where:{id:id}, returning: true})
          .then(updatedTodo =>{
              res.status(200).json(updatedTodo[1])
          })
          .catch (err => {
            next(err)
          })
    }

    static patchTodoId(req, res, next) {
      let id = +req.params.id
      let status = req.body.status
      Todo.update(
        {status},{
        where: {id:id},
        returning: true})
        .then(patchedTodo =>{
            res.status(200).json(patchedTodo[1])
        })
        .catch (err => {
          next(err)
        })
    }

    static deleteTodoId(req, res, next) {
      let id = +req.params.id
      Todo.destroy({
        where:{id:id},
        returning: true})
          .then(deletestatus => {
              res.status(200).json({message:'todo success to delete'})
          })
          .catch(err => {
            next(err)
          })

    }

    static getWeather(req,res, next) {
      let location = req.body.location
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHERKEY}`)
        .then(weather => {
          res.status(200).json(weather.data)
        })
        .catch(err => {
          next(err)
        })
    }
}

module.exports = Todo2