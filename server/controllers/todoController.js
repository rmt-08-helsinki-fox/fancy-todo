const {Todo} = require('../models')

class TodoController {
  
  static async create(req, res) {
    try {
      const {
        title,
        description,
        status,
        due_date
      } = req.body
      
      const createdData = await Todo.create({title, description, status, due_date})
      
      if(!createdData) throw({msg: 'Internal server error'})
      res.status(201).json(createdData)
      
    } catch (error) {
      res.status(400).json(error.msg)
    }
  }

  static async viewAll(req, res) {
    try {
      const todoList = await Todo.findAll()
      if(!todoList) throw({msg: 'Internal server error'})
      res.status(200).json(todoList)

    } catch(error) {
      res.status(500).json({error})
    }
  }

  static async viewById(req, res) {
    try {
      const id = +req.params.id
      const todo = await Todo.findByPk(id)

      if(!todo) throw({msg: 'Data not found'})
      res.status(200).json(todo)

    } catch (error) {
      res.status(404).json({error})
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id
      const {
        title,
        description,
        status,
        due_date
      } = req.body

      const selected = await Todo.findByPk(id)
      if(!selected) throw({msg: 'Error not found'})
      
      const updated = await Todo.update({title, description, status, due_date}, {where: {
        id
      },
      returning: true
      })

      if(!updated) throw({msg: 'Internal server error'})
      res.status(200).json(updated[1][0])

    } catch (error) {
      res.status(400).json(error.msg)
    }
  }

  static async updateStatus(req, res) {
    try {
      const id = +req.params.id
      const {
        status
      } = req.body

      const selected = await Todo.findByPk(id)
      if(!selected) throw({msg: 'Error not found'})

      const updated = await Todo.update({status}, {where: {
        id
      }})
      if(!updated) throw({msg: 'Internal server error'})
      res.status(200).json(updated[1][0])
      
    } catch (error) {
      res.status(400).json(error.msg)
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id

      const selected = await Todo.findByPk(id)
      if(!selected) throw ({msg: 'Error not found'})

      const deleted = await Todo.destroy({where: {
        id
      }})

      if(!deleted) throw({msg: 'Internal server error'})
      res.status(200).json({message: 'todo success to delete'})
      
    } catch (error) {
      res.status(400).json(error.msg)
    }
  }
}

module.exports =  TodoController