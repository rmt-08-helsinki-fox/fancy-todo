const { Todo } = require('../models/');

const authorization = (req, res, next) => {
  const id = +req.params.id;

  Todo.findOne({
    where: { id: id }
  })
    .then(todo => {
      if (!todo) throw { name: "Error404", msg: 'Task Not Found', status: 404 };

      if (todo.userId === req.decoded.id) {
        next();
      } else {
        throw { name: "Error401", msg: 'You are not authorized to access', status: 401 };
      }
    })
    .catch(err => {
      next(err);
    })
}

module.exports = authorization;