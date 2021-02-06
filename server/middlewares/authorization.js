const { Todo, User, UserTodo } = require("../models");

async function authorization(req, res, next) {
  try {
    const todoId = Number(req.params.id);
    const userId = req.payload.id;
    const todo = await Todo.findByPk(todoId, { include: UserTodo })
    if(!todo || userId !== todo.UserTodos[0].userId) {
      throw { name: "Forbidden", message: "you don't have permission", status: 403 }
    }
    next();
  } catch (err) {
    next(err)
  }
}


module.exports = authorization;