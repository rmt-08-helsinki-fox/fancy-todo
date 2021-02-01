const { Todo } = require('../models')

class TodoController {
  static async postTodo(req, res) {
    try {
      const { title, description, status, due_date } = req.body
      let newTodo = await Todo.create({
        title,
        description,
        status,
        due_date
      })
      res.status(201).json(newTodo)
    } catch (error) {
      if (error.name === 'SequelizeValidationError'){
        res.status(400).json(error)
      } else {
        res.status(500).json({msg : "Internal server error"})
      }
    }
  }


  static async getTodo(req, res) {
    try {
      let todos = await Todo.findAll()
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json({msg : "Internal server error"})
    }
  }

  static async getTodoById(req, res) {
    try {
      const id = +req.params.id
      let todo = await Todo.findByPk(id)
      if (todo) {
        res.status(200).json(todo)
      } else {
        res.status(404).json({msg : "Todo is not Found"})
      }
    } catch (error) {
      res.status(500).json({msg : "Internal server error"})
    }
  }

  static async putTodo(req, res) {
    try {
      const id = +req.params.id
      const {title, description, status, due_date} = req.body
      let obj = {}

      if (title){
        obj.title = title
      }
      if (description){
        obj.description = description
      }
      if (status){
        obj.status = status
      }
      if (due_date){
        obj.due_date = due_date
      }
      let todo = await Todo.update(obj, {
        where:{
          id:id
        },
        returning: true
      })

      if (todo[0] === 0){
        res.status(404).json({msg: 'Todo is not found'})
      } else {
        res.status(200).json(todo[1][0])
      }

    } catch (error) {
      if (error.name === 'SequelizeValidationError'){
         res.status(400).json(error)
      } else {
        res.status(500).json({msg : "Internal server error"})
      }
    }
  }

  static async updateStatusTodo(req, res) {
    try {
      const id = +req.params.id
      const status = req.body.status
      let todo = await Todo.update({status}, {
        where:{
          id:id
        },
        returning: true
      })

      if (todo[0] === 0){
        res.status(404).json({msg: 'Todo is not found'})
      } else {
        res.status(200).json(todo[1][0])
      }
    } catch (error) {
      if (error.name === 'ValidationErrorItem'){
        res.status(400).json({error})
     } else {
       res.status(500).json({msg : "Internal server error"})
     }
    }
  }

  static async deleteTodo(req, res) {
    try {
      const id = +req.params.id
      let todo = await Todo.findByPk(id)
      if (todo){
        Todo.destroy({
          where: {
            id: id
          }
        })
        res.status(200).json(todo)
      } else {
        res.status(404).json({msg: "Todo is not found"})
      }
    } catch (error) {
      res.status(500).json({msg : "Internal server error"})
    }
  }
}

module.exports = TodoController