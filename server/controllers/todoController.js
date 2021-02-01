const {Todo} = require('../models')

class TodoController {
  static async viewAll(req, res) {
    try {
      const todoList = await Todo.findAll()
      if(!todoList) throw new Error('Internal server error')
      res.status(500).JSON(todoList)

    } catch(error) {
      res.status(404).JSON(error)
    }
  }

  static async create(req, res) {
    try {
      const {
        title,
        description,
        due_date
      } = req.body
      
      const createdData = await Todo.create({title, description, due_date})
      
      if(!createdData) throw new Error('Internal server error')
      res.status(201).JSON({msg: "New Todo created!"})
      
    } catch (error) {
      res.status(400).JSON(error)
    }
  }

  static async viewById(req, res) {
    try {
      const id = req.body.id
      const todo = await Todo.findByPK(id)

      if(!todo) throw new Error('Data not found')
      res.status(200).JSON(todo)

    } catch (error) {
      res.status(404).JSON(error)
    }
  }
}

module.exports =  TodoController