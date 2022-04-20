const { Todo } = require("../models");

const authorize = function (req, res, next) {
  const todoId = +req.params.id;
  Todo.findByPk(todoId)
    .then((todo) => {
      if (!todo)
        throw { message: "data not found", status: 404, name: "custom" };
      if (req.decoded.id === todo.UserId) {
        next();
      } else {
        res.status(400).json({
          message: "Not authorized",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = authorize;
