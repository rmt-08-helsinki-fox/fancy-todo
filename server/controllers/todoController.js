const { Todo } = require('../models');

class TodoController {
  static addTodo(req, res) {
    const { title, description, status, due_date } = req.body;
    console.log(req.body);
    Todo.create({
      title,
      description,
      status,
      due_date: new Date(due_date)
    })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        if (err.errors[0].message) {
          res.status(400).json({ error: err.errors[0].message});
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      })
  }

  static getTodos(req, res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        res.status(500).json({ error: 'Internal Server Error' });
      })
  }

  static getTodoById(req, res) {
    const id = +req.params.id;
    Todo.findOne({
      where: { id: id }
    })
      .then(todo => {
        if (!todo) throw { msg: 'Error Not Found', status: 404 }
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

        if (!updatedTodo) throw ({ msg: 'Error Not Found', status: 404 })
        
        res.status(200).json(updatedTodo)
      })
      .catch(err => {
        console.log(err)
        if (err.errors) {
          res.status(400).json({ error: err.errors[0].message});
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

        if (!updatedTodo) throw ({ msg: 'Error Not Found', status: 404 });
        
        res.status(200).json(updatedTodo)
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).json({ error: err.errors[0].message});
        } else {
          const error = err.msg || 'Internal Server Error';
          const status = err.status || 500;
          res.status(status).json({ error });
        }
      })
  }

  static deleteTodo(req, res) {
    const id = +req.params.id;
    
    Todo.destroy({
      where: { id }
    })
      .then(lenTodo => {
        if (lenTodo == 0) throw { msg: 'Error Not Found', status: 404 };
        res.status(200).json({ msg: 'Todo success to delete'});
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