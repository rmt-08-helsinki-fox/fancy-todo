const { Todo } = require("../models");

async function authorization(req, res, next) {
  try {
    console.log(req.params, "ini di autorisasi")
    const todoId = Number(req.params.id);
    const userId = req.payload.id;
    const todo = await Todo.findByPk(todoId)
    console.log(todo.userId, userId, todoId)
    if(!todo || userId !== todo.userId) {
      throw { name: "Forbidden", message: "you don't have permission", status: 403 }
    }
    next();
  } catch (err) {
    next(err)
  }
}


module.exports = authorization;