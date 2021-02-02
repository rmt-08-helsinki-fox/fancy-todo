const jwt = require("jsonwebtoken");
const { Todo } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const id = +req.params.id;
    let todo = await Todo.findByPk(id);
    if (todo.UserId === req.data.id) {
      next();
    } else {
      throw { error: { status: 401, message: "Invalid token" } };
    }
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { authorization };
