const { Todo } = require("../models/");
const { checkToken } = require("../helper/jwt");

class controllers {
  static addTodo(req, res, next) {
    const UserId = req.user.id;
    const { title, description, due_date } = req.body;
    const data = {
      title,
      description,
      status: false,
      due_date,
      UserId,
    };

    Todo.create(data)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getAllTodos(req, res, next) {
    const UserId = req.user.id;
    Todo.findAll({
      where: {
        UserId,
      },
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTodoById(req, res, next) {
    let id = req.params.id;
    Todo.findByPk(id)
      .then((data) => {
        if (!data) {
          next({ name: "Not Found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateTodo(req, res, next) {
    const id = req.params.id;
    const { title, description, due_date } = req.body;
    const data = {
      title,
      description,
      due_date,
    };

    Todo.update(data, {
      where: {
        id,
      },
      returning: true,
    })
      .then((data) => {
        if (!data) {
          next({ name: "Not Found" });
        } else {
          res.status(200).json(data[1]);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateStatus(req, res, next) {
    const id = req.params.id;
    const data = {
      status: req.body.status,
    };

    Todo.update(data, {
      where: {
        id,
      },
      returning: true,
    })
      .then((data) => {
        if (!data) {
          next({ name: "Not Found" });
        } else {
          res.status(200).json(data[1]);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteTodo(req, res, next) {
    const id = req.params.id;

    Todo.destroy({
      where: {
        id,
      },
    })
      .then((data) => {
        if (!data) {
          next({ name: "Not Found" });
        } else {
          res.status(200).json("Todo Success to delete");
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteAllDoneTodo(req, res, next) {
    let decoded = checkToken(req.headers.access_token);
    let UserId = decoded.id;
    Todo.destroy({
      where: {
        UserId,
        status: true,
      },
    })
      .then((data) => {
        res.status(200).json({ message: "All Done Todos Deleted" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = controllers;
