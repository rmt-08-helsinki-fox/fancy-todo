const {Todo} = require('../models')
const axios = require('axios')

class TodoController {
  
  static async create(req, res, next) {
    try {
      const {
        title,
        description,
        status,
        due_date
      } = req.body
      const UserId = req.decoded.id

      const createdData = await Todo.create({title, description, status, due_date, UserId})
      
      if(!createdData) throw({msg: 'Internal server error'})
      const month = `${due_date[5]}${due_date[6]}`
      const day = `${due_date[8]}${due_date[9]}`
      
      let holiday = await axios.get(`https://holidayapi.com/v1/holidays?pretty&key=9321ae22-9fdc-483f-a79b-6f555cfbcbc4&country=ID&year=2020&month=${month}&day=${day}`)

      holiday = holiday.data.holidays
      
      if(holiday) res.status(201).json({createdData, holiday})
      else res.status(201).json({createdData})
      
    } catch (error) {
      next(error)
    }
  }

  static async viewAll(req, res, next) {
    try {
      const todoList = await Todo.findAll()
      if(!todoList) throw({msg: 'Internal server error'})
      res.status(200).json(todoList)

    } catch(error) {
      next(error)
    }
  }

  static async viewById(req, res, next) {
    try {
      const id = +req.params.id
      const todo = await Todo.findByPk(id)

      if(!todo) throw({msg: 'Data not found'})
      res.status(200).json(todo)

    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
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
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const id = +req.params.id
      const {
        status
      } = req.body

      const selected = await Todo.findByPk(id)
      if(!selected) throw({msg: 'Error not found'})

      const updated = await Todo.update({status}, {where: {
        id
      },
      returning: true
    })
      if(!updated) throw({msg: 'Internal server error'})
      res.status(200).json(updated[1][0])
      
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
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
      next(error)
    }
  }
}

module.exports =  TodoController