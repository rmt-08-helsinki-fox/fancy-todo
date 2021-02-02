// const jwt = require("jsonwebtoken");
const { Todo } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const id = +req.params.id;
    let todo = await Todo.findByPk(id);
    if (!todo)
      throw { name: "customError", status: 404, message: "Todo Not found" };
    if (todo.UserId === req.data.id) {
      next();
    } else {
      throw { name: "customError", status: 401, message: "Invalid token" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
