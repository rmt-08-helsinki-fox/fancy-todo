const { Todo } = require("../models");

async function authorization(req, res, next) {
  try {
    const userId = req.payload.id;
    const todo = await Todo.findOne({ where: { userId } })
    if(!todo || userId !== todo.userId) {
      throw { name: "Forbidden", message: "you don't have permission", status: 403 }
    }
    next();
  } catch (err) {
    next(err)
  }
}


module.exports = authorization;