const { Todo } = require('../models')


class TodoController {

  static create(req, res) {
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
        if (err.name === 'SequelizeValidationError' && err.errors.length > 0) {
          let errMsg = err.errors.map(err => err.message);
          let error = { errors: errMsg }

          res.status(400).json(error);
        } else {
          res.status(500).json(err)
        }
      })
  }

  static list(req, res) {
    Todo.findAll()
      .then((todo) => {
        res.status(200).json(todo)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static todoById(req, res) {
    const id = +req.params.id

    Todo.findOne({
      where: {
        id,
        UserId: +req.decoded.id
      }
    })
      .then((todo) => {
        if (todo) {
          res.status(200).json(todo)
        } else {
          throw { error: 'Todo not found', status: 404}
        }
      })
      .catch((err) => {
        const errMsg = err.error || 'Internal server error';
        const status = err.status || 500;

        res.status(status).json({ error: errMsg});
      })
  }

  static updatePut(req, res) {
    const id = +req.params.id;
    const { title, description, status, due_date } = req.body;
    const input = { title, description, status, due_date }

    Todo.update(input, {
      where: {
        id,
        UserId: +req.decoded.id
      },
      returning: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0])
        } else {
          throw { error: 'Todo not found', status: 404 };
        }
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError' && err.errors.length > 0) {
          let errMsg = err.errors.map(err => err.message);
          let error = { errors: errMsg }

          res.status(400).json(error);
        } else {
          const errorMessage = err.error || 'Internal server error';
          const status = err.status || 500;

          res.status(status).json({ error: errorMessage });
        }
      })
  }

  static updatePatch(req, res) {
    const id = +req.params.id;
    const status = req.body.status;
    const input = { status }

    console.log(id);

    Todo.update(input, {
      where: {
        id,
        UserId: req.decoded.id
      },
      returning: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0])
        } else {
          throw { error: 'Todo not found', status: 404 }
        }
      })
      .catch((err) => {
        const errorMessage = err.error || 'Internal server error';
        const status = err.status || 500;

        res.status(status).json({ error: errorMessage });
      })
  }

  static delete(req, res) {
    const id = +req.params.id

    Todo.destroy({
      where: {
        id,
        UserId: req.decoded.id
      }
    })
      .then((todo) => {
        if (todo) {
          res.status(200).json({ message: 'todo success to delete' })
        } else {
          throw { error: 'Todo not found', status: 404 }
        }
      })
      .catch((err) => {
        const errorMessage = err.error || 'Internal server error';
        const status = err.status || 500;

        res.status(status).json({ error: errorMessage });
      })
  }
}


module.exports = TodoController;