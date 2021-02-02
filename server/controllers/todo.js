const { Todo } = require('../models');

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
      .then((todo) => {
        res.status(200).json(todo)
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
          throw { error: 'Todo Not Found', status: 404}
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
      returning: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0])
        } else {
          throw { error: 'Todo Not Found', status: 404 };
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
      returning: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0])
        } else {
          throw { error: 'Todo Not Found', status: 404 }
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
          throw { error: 'Todo Not Found', status: 404 }
        }
      })
      .catch((err) => {
        next(err);
      })
  }
}


module.exports = TodoController;