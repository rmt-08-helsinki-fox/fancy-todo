const { Todo } = require("../models");

class TodoController {
  static postTodos(req, res, next) {
    const { title, description, status, due_date } = req.body;
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId: req.data.id,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTodos(req, res, next) {
    Todo.findAll({ where: { UserId: req.data.id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static putTodos(req, res, next) {
    const id = +req.params.id;
    const { title, description, status, due_date } = req.body;

    Todo.update(
      {
        title,
        description,
        status,
        due_date,
      },
      { where: { id: id }, returning: true }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        if (err.errors) {
          next(err);
        } else {
          next({
            name: "customError",
            status: 500,
            message: "Kesalahan server 500",
          });
        }
      });
  }

  static patchTodos(req, res) {
    const id = +req.params.id;

    const { status } = req.body;

    Todo.update(
      {
        status,
      },
      { where: { id: id }, returning: true }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        if (err.errors) {
          next(err);
        } else {
          next({
            name: "customError",
            status: 500,
            message: "Kesalahan server 500",
          });
        }
      });
  }

  static deleteTodos(req, res) {
    const id = +req.params.id;

    Todo.destroy({ where: { id: id }, returning: true })
      .then((data) => {
        res.status(200).json({ data: data, messsage: "todo succes to delete" });
      })
      .catch((err) => {
        next({
          name: "customError",
          status: 500,
          message: "Kesalahan server 500",
        });
      });
  }
}

module.exports = TodoController;
