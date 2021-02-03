const { Todo } = require('../models');

class TodoController {
  static addTodo(req, res, next) {
    const { title, description, due_date } = req.body;
    Todo.create({
      title,
      description,
      due_date: new Date(due_date),
      userId: req.decoded.id
    })
      .then(newTodo => {
        res.status(201).json(newTodo);
      })
      .catch(err => {
        next(err);
      })
  }

  static getTodos(req, res, next) {
    const status = req.query.status || 'false';

    Todo.findAll({
      where: {
        userId: req.decoded.id,
        status
      },
      order: [['due_date', 'asc']]
    })
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        next(err);
      })
  }

  static getTodoById(req, res, next) {
    const id = +req.params.id;
    Todo.findOne({
      where: { id: id }
    })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateTodo(req, res, next) {
    const id = +req.params.id;
    const { title, description, due_date } = req.body;

    Todo.update({
      title,
      description,
      due_date: new Date(due_date)
    }, {
      where: { id },
      returning: true
    })
      .then(todo => {
        const updatedTodo = todo[1][0];
        
        res.status(200).json(updatedTodo);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateStatus(req, res, next) {
    const id = +req.params.id;
    const { status } = req.body;

    Todo.update({
      status
    }, {
      where: { id },
      returning: true
    })
      .then(todo => {
        const updatedTodo = todo[1][0];
        
        res.status(200).json(updatedTodo);
      })
      .catch(err => {
        next(err);
      })
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id;
    let deletedTodo;

    Todo.findByPk(id)
      .then(todo => {
        deletedTodo = todo;
        return Todo.destroy({
          where: { id }
        })
      })
      .then(lenTodo => {
        res.status(200).json({ delete_todo: deletedTodo, message: 'Successfully delete todo' });
      })
      .catch(err => {
        next(err);
      })
  }
  
}

module.exports = TodoController;