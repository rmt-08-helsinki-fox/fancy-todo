const { Todo } = require('../models');
const axios = require('axios');
const momentJs = require('../helpers/moment')

class TodoController {

  static create(req, res, next) {
    const userId = req.decoded.id
    const { title, description, status, due_date } = req.body;
    const newTodo = { title, description, status, due_date, UserId: userId };

    Todo.create(newTodo)
      .then((todo) => {
        if (todo) {
          res.status(201).json(todo)
        }
      })
      .catch((err) => {
        next(err);
      })
  }

  static list(req, res, next) {
    const userId = req.decoded.id;
    Todo.findAll({
      where: {
        UserId: userId
      },
      order: [['id', 'asc']]
    })
      .then((todos) => {
        const moment = todos.map((todo) => momentJs(todo.due_date))
 
        res.status(200).json({todos, moment})
      })
      .catch((err) => {
        next(err);
      })
  }

  static todoById(req, res, next) {
    const id = +req.params.id

    Todo.findOne({
      where: {
        id
      }
    })
      .then((todo) => {
        if (todo) {
          res.status(200).json(todo)
        } else {
          throw { name: 'CustomError', error: 'Todo Not Found', status: 404}
        }
      })
      .catch((err) => {
        next(err);
      })
  }

  static updatePut(req, res, next) {
    const id = +req.params.id;
    const { title, description, status, due_date } = req.body;
    const input = { title, description, status, due_date }

    Todo.update(input, {
      where: {
        id
      },
      returning: true,
      individualHooks: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0])
        } else {
          throw { name: 'CustomError', error: 'Todo Not Found', status: 404 };
        }
      })
      .catch((err) => {
        next(err);
      })
  }

  static updatePatch(req, res, next) {
    const id = +req.params.id;
    const status = req.body.status;
    const input = { status }


    Todo.update(input, {
      where: {
        id
      },
      returning: true,
      individualHooks: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0])
        } else {
          throw { name: 'CustomError', error: 'Todo Not Found', status: 404 }
        }
      })
      .catch((err) => {
        next(err);
      })
  }

  static delete(req, res, next) {
    const id = +req.params.id

    Todo.destroy({
      where: {
        id
      }
    })
      .then((todo) => {
        if (todo) {
          res.status(200).json({ message: 'todo success to delete' })
        } else {
          throw { name: 'CustomError', error: 'Todo Not Found', status: 404 }
        }
      })
      .catch((err) => {
        next(err);
      })
  }

  static weather(req, res, next) {
    
  }
}


module.exports = TodoController;