const { Todo, User } = require("../models");
const { Op } = require("sequelize");
class TodoController {
  static showAllTodos(req, res, next) {
    Todo.findAll({ include: [User] })
      .then((todos) => {
        // if (todos.length <= 0)
        //   throw {
        //     message: "Todo not found",
        //     status: 404,
        //     name: "Server",
        //   };

        res.status(200).json({ todos });
      })
      .catch((err) => {
        next(err);
      });
  }
  static createTodo(req, res, next) {
    const userId = +req.decoded.id;
    const { title, description, status, due_date } = req.body;
    Todo.create({ title, description, status, due_date, UserId: userId })
      .then((todo) => {
        res.status(201).json(todo);
      })
      .catch((err) => {
        next(err);
      });
  }
  static showTodoById(req, res, next) {
    const todoId = +req.params.id;
    const userId = +req.decoded.id;
    Todo.findOne({
      where: {
        [Op.and]: [{ id: todoId }, { UserId: userId }],
      },
    })
      .then((todo) => {
        if (!todo) {
          throw { message: "data not found", status: 404, name: "Custom" };
        }
        res.status(200).json(todo);
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateTodoById(req, res, next) {
    const todoId = +req.params.id;
    const { title, description, status, due_date } = req.body;
    Todo.update(
      {
        title,
        description,
        status,
        due_date,
      },
      {
        where: { id: todoId },
        returning: true,
      }
    )
      .then((todo) => {
        if (!todo[0]) {
          throw { message: "Not update a todo", status: 404, name: "Custom" };
        }
        res.status(200).json(todo[1][0]);
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateStatusTodo(req, res, next) {
    const todoId = +req.params.id;
    Todo.update(
      { status: "finished" },
      { where: { id: todoId }, returning: true }
    )
      .then((todo) => {
        if (!todo[0]) {
          throw { message: "Not update a todo", status: 404, name: "Custom" };
        }
        res.status(200).json(todo[1][0]);
      })
      .catch((err) => {
        next(err);
      });
  }
  static deleteTodo(req, res, next) {
    const todoId = +req.params.id;
    Todo.destroy({ where: { id: todoId } })
      .then((todo) => {
        if (!todo)
          throw { message: "data not found", status: 404, name: "Custom" };
        res.status(200).json("todo success to delete");
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TodoController;
