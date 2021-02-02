const e = require('express')
const { Todo, User } = require('../models')

class Controller {
  static todosList(req, res) {
    // {
    //   where: {
    //     UserId: req.decoded.id
    //   },
    //   include: [User]
    // }
    Todo.findAll()
      .then(data => {
        res.status(200).json({
          data,
          msg: "success"
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static addTodos(req, res) {
    const { title, description, status, due_date } = req.body
    const data = { title, description, status, due_date }
    // data.UserId = req.params.id
    Todo.create(data)
      .then(success => {
        res.status(201).json(success)
      })
      .catch(err => {
        if (err.errors[0].message === 'Terlambat') {
          res.status(400).json(err.errors[0])
        } else {
          res.status(500).json(err)
        }
      })
  }
  static findTodosbyId(req, res) {
    const id = req.params.id
    Todo.findByPk(id)
      .then(data => {
        if (!data) throw data
        res.status(200).json(data)
      })
      .catch(err => {
        if (err === null) {
          res.status(404).json({
            msg: 'Data not found'
          })
        } else {
          res.status(500).json(err)
        }
      })
  }
  static editTodo(req, res) {
    const id = req.params.id
    const { title, description, status, due_date } = req.body
    const dataEdit = { title, description, status, due_date }
    Todo.findByPk(id)
      .then(data => {
        if (!data) throw data
        Todo.update(dataEdit, {
          where: {
            id: id
          }
        }).then(success => {
          res.status(200).json(dataEdit)
        }).catch(err => {
          if (err.errors[0].message === 'Terlambat') {
            res.status(400).json(err.errors[0])
          } else {
            res.status(500).json(err)
          }
        })
      })
      .catch(err => {
        if (err === null) {
          res.status(404).json({
            msg: 'Data not found'
          })
        } else {
          res.status(500).json(err)
        }
      })
  }
  static editStatusTodo(req, res) {
    const id = req.params.id
    const { status } = req.body
    Todo.findOne({
      where: {
        id: id
      }
    }).then(data => {
      if (!data) throw data
      Todo.update({ status }, {
        where: {
          id: id
        }
      }).then(success => {
        res.status(200).json(success)
      }).catch(err => {
        if (err.errors[0].message === 'notBool') {
          res.status(400).json(err.errors[0])
        } else {
          res.status(500).json(err)
        }
      })
    }).catch(err => {
      if (err === null) {
        res.status(404).json({ msg: 'Data not found' })
      } else {
        res.status(500).json(err)
      }
    })
  }
  static deleteTodo(req, res) {
    const id = req.params.id
    Todo.destroy({
      where: {
        id: id
      }
    }).then(success => {
      if (!success) throw success
      res.status(200).json({ msg: 'todo success to delete' })
    }).catch(err => {
      if (err === 0) {
        res.status(404).json({ msg: 'Data not found' })
      } else {
        res.status(500).json(err)
      }
    })
  }
}
module.exports = Controller