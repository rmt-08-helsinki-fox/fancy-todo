const { Todo } = require("../models");
const axios = require("axios").default;

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
    const apiKey = process.env.OpenWeatherAPI;
    const cityName = req.data.city;

    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    })
      .then((response) => {
        let weatherData = response.data;
        Todo.findAll({ where: { UserId: req.data.id } })
          .then((data) => {
            res.status(200).json({ data, weatherData });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
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
