const { ToDo } = require('../models/')
const axios = require('axios')

class ToDoController {
  static async createToDo(req, res, next) {
    try {
      const UserId = req.decoded.id
      const { title, description, status, due_date } = req.body

      const newToDo = {
        title,
        description,
        status,
        due_date,
        UserId
      }

      const data = await ToDo.create(newToDo)

      if (!data) throw (error)

      res.status(201).json(data)
    } 
    catch (error) {
      next(error)
    }
  }

  static async getAll(req, res, next) {
    try {
      const UserId = req.decoded.id
      const data = await ToDo.findAll({
        where: { UserId }
      })

      if(!data) throw (error)

      res.status(200).json(data)
    } 
    catch (error) {
      next(error)
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params

      const data = await ToDo.findByPk(id)

      if(!data) throw ({
        status: 404,
        error: "id not found"
      })

      res.status(200).json(data)
    } 
    catch (error) {
      next(error)
    }
  }

  static async editAllFieldById(req, res, next) {
    try {
      const { id } = req.params
      const { title, description, status, due_date } = req.body

      const editedToDo = {
        title,
        description,
        status,
        due_date
      }

      const data = await ToDo.update(editedToDo, {
        where: { id },
        returning: true
      })

      if(!data) throw (error)

      res.status(200).json(data)
    } 
    catch (error) {
      next(error)
    }
  }

  static async editSpecificFieldById(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body

      const data = await ToDo.update({status}, {
        where: {
          id
        },
        returning: true
      })

      if(!data) throw (error)

      res.status(200).json(data)
    } 
    catch (error) {
      next(error)
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params

      const data = await ToDo.destroy({
        where: {
          id
        }
      })

      res.status(200).json({
        message: "todo success to delete"
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = ToDoController