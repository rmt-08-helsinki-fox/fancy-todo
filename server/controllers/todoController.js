const { Todo } = require("../models");
class TodoController {
  static showAllTodo(req, res) {
    Todo.findAll()
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static createTodo(req, res) {
    const { title, description, status, due_date } = req.body;
    Todo.create({ title, description, status, due_date })
      .then((todo) => {
        res.status(201).json(todo);
      })
      .catch((err) => {
        const error = err.errors[0].message;
        if (err.errors[0].type === "Validation error") {
          res.status(400).json(error);
        } else {
          res.status(500).json(error);
        }
      });
  }
  static showTodoById(req, res) {
    const id = +req.params.id;
    Todo.findByPk(id)
      .then((todo) => {
        if (!todo) {
          throw { msg: "data not found" };
        }
        res.status(200).json(todo);
      })
      .catch((err) => {
        const error = err.msg;
        res.status(404).json(error);
      });
  }
  static updateTodoById(req, res) {
    const id = +req.params.id;
    const { title, description, status, due_date } = req.body;
    Todo.update(
      {
        title,
        description,
        status,
        due_date,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((todo) => {
        if (!todo[0]) {
          throw { msg: "data not found", status: 404 };
        }
        res.status(200).json(todo[1][0]);
      })
      .catch((err) => {
        if (!err.errors) {
          const msg = err.msg;
          const status = err.status || 500;
          if (msg) {
            res.status(status).json(msg);
          } else {
            res.status(staus).json(err);
          }
        } else {
          const error = err.errors[0].message;
          res.status(400).json(error);
        }
      });
  }
  static updateStatusTodo(req, res) {
    const id = +req.params.id;
    Todo.update({ status: "finished" }, { where: { id }, returning: true })
      .then((todo) => {
        if (!todo[0]) {
          throw { msg: "data not found", status: 404 };
        }
        res.status(200).json(todo[1][0]);
      })
      .catch((err) => {
        if (!err.errors) {
          const msg = err.msg;
          const status = err.status || 500;
          if (msg) {
            res.status(status).json(msg);
          } else {
            res.status(staus).json(err);
          }
        } else {
          const error = err.errors[0].message;
          res.status(400).json(error);
        }
      });
  }
  static deleteTodo(req, res) {
    const id = +req.params.id;
    Todo.destroy({ where: { id } })
      .then(() => {
        res.status(200).json("todo success to delete");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = TodoController;
