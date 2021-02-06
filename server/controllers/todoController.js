const { Todo } = require("../models");
const axios = require("axios").default;

class TodoController {
  static async postTodos(req, res, next) {
    try {
      console.log(req.data);
      const { title, description, due_date } = req.body;
      let todo = await Todo.create({
        title,
        description,
        status: false,
        due_date,
        UserId: req.data.id,
      });
      res.status(201).json({ data: todo });
    } catch (err) {
      next(err);
    }
  }

  static async getTodos(req, res, next) {
    try {
      let todos = await Todo.findAll({
        where: { UserId: req.data.id },
        order: [["id", "ASC"]],
      });
      res.status(200).json({ data: todos });
    } catch (err) {
      next(err);
    }
  }

  static async putTodos(req, res, next) {
    try {
      const id = +req.params.id;
      const { title, description, due_date } = req.body;

      let updateTodo = await Todo.update(
        {
          title,
          description,
          due_date,
        },
        { where: { id: id }, returning: true }
      );

      res.status(200).json({ data: updateTodo });
    } catch (err) {
      if (err.errors) {
        next(err);
      } else {
        next({
          name: "customError",
          status: 500,
          message: "Internal server errors",
        });
      }
    }
  }

  static async patchTodos(req, res, next) {
    try {
      const id = +req.params.id;

      let todoDone = await Todo.update(
        { status: true },
        { where: { id: id }, returning: true }
      );

      res.status(200).json({ data: todoDone });
    } catch (err) {
      if (err.errors) {
        next(err);
      } else {
        next({
          name: "customError",
          status: 500,
          message: "Kesalahan server 500",
        });
      }
    }
  }

  static async deleteTodos(req, res, next) {
    try {
      const id = +req.params.id;
      let deleted = await Todo.destroy({ where: { id: id }, returning: true });

      res
        .status(200)
        .json({ data: deleted, messsage: "todo succes to delete" });
    } catch (err) {
      next({
        name: "customError",
        status: 500,
        message: "Kesalahan server 500",
      });
    }
  }

  static weatherStack(req, res, next) {
    const apiKey = process.env.WEATHER_API;
    const latt = req.body.latitude;
    const long = req.body.longitude;

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latt},${long}`
      )
      .then((response) => {
        let weatherLoc = response.data.location;
        let weatherCurrent = response.data.current;

        res.status(200).json({ weatherLoc, weatherCurrent });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TodoController;
