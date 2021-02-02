const { Todo } = require("../models");

class TodoController {
  static postTodos(req, res) {
    const { title, description, status, due_date, UserId } = req.body;
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId: +UserId,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        if (err.errors) {
          res.status(400).json(err.errors[0].message);
        } else {
          res.status(500).json("Kesalahan server 500");
        }
      });
  }

  static getTodos(req, res) {
    Todo.findAll({ where: { UserId: req.data.id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Data not found" });
      });
  }

  static putTodos(req, res) {
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
        if (data[0] === 0) {
          res.status(404).json({ msg: "Id not found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        if (err.errors) {
          res.status(400).json(err.errors[0].message);
        } else {
          res.status(500).json({ msg: "Kesalahan server 500" });
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
        if (data[0] === 0) {
          res.status(404).json({ msg: "Id not found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        if (err.errors) {
          res.status(400).json(err.errors[0].message);
        } else {
          res.status(500).json({ msg: "Kesalahan server 500" });
        }
      });
  }

  static deleteTodos(req, res) {
    const id = +req.params.id;

    Todo.destroy({ where: { id: id }, returning: true })
      .then((data) => {
        console.log(data);
        if (data[0] === 0) {
          res.status(404).json({ msg: "Id not found" });
        } else {
          res
            .status(200)
            .json({ data: data, messsage: "todo succes to delete" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Kesalahan server 500" });
      });
  }
}

module.exports = TodoController;
