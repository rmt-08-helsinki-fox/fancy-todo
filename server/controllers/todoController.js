const { Todo } = require('../models');

class TodoController {
  static addTodo(req, res) {
    const { title, description, status, due_date } = req.body;
    Todo.create({
      title,
      description,
      status,
      due_date: new Date(due_date)
    })
      .then(todo => {
        res.status(201).json(todo);
      })
      .catch(err => {
        console.log(err);
        if (err.errors) {
          const errorValidations = err.errors.map(err => err.message);
          res.status(400).json({ errors: errorValidations });
        } else {
          res.status(500).json({ errors: 'Internal Server Error' });
        }
      })
  }

  static getTodos(req, res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        res.status(500).json({ errors: 'Internal Server Error' });
      })
  }

  static getTodoById(req, res) {
    const id = +req.params.id;
    Todo.findOne({
      where: { id: id }
    })
      .then(todo => {
        if (!todo) throw { msg: 'Task Not Found', status: 404 };
        res.status(200).json(todo);
      })
      .catch(err => {
        console.log(err);
        const error = err.msg || 'Internal Server Error';
        const status = err.status || 500;
        res.status(status).json({ error });
      })
  }

  static updateAllField(req, res) {
    const id = +req.params.id;
    const { title, description, status, due_date } = req.body;

    Todo.update({
      title,
      description,
      status,
      due_date: new Date(due_date)
    }, {
      where: { id },
      returning: true
    })
      .then(todo => {
        const updatedTodo = todo[1][0];

        if (!updatedTodo) throw ({ msg: 'Task Not Found', status: 404 })
        
        res.status(200).json(updatedTodo);
      })
      .catch(err => {
        console.log(err);
        if (err.errors) {
          const errorValidations = err.errors.map(err => err.message);
          res.status(400).json({ errors: errorValidations});
        } else {
          const error = err.msg || 'Internal Server Error';
          const status = err.status || 500;
          res.status(status).json({ error });
        }
      })
  }

  static updateOneField(req, res) {
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

        if (!updatedTodo) throw ({ msg: 'Task Not Found', status: 404 });
        
        res.status(200).json(updatedTodo)
      })
      .catch(err => {
        if (err.errors) {
          const errorValidations = err.errors.map(err => err.message);
          res.status(400).json({ errors: errorValidations});
        } else {
          const error = err.msg || 'Internal Server Error';
          const status = err.status || 500;
          res.status(status).json({ error });
        }
      })
  }

  static deleteTodo(req, res) {
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
        if (lenTodo == 0) throw { msg: 'Task Not Found', status: 404 };
        res.status(200).json({ delete_todo: deletedTodo, message: 'Todo success to delete'});
      })
      .catch(err => {
        console.log(err);
        const error = err.msg || 'Internal Server Error';
        const status = err.status || 500;
        res.status(status).json({ error });
      })
  }

}

module.exports = TodoController;