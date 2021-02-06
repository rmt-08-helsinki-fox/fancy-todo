const { Todo } = require('../models/')

const authorization = function (req, res, next) {
  const id = +req.params.id

  if (!id) {
    res.status(400).json({ errors: 'Invalid Input'})
  } else {
    Todo.findByPk(id)
    .then((data) => {
      if(!data) throw { name: 'Error404', status: 404, msg: 'Task Not Found'}
      if (data.user_id === req.decoded.id) {
        next()
      } else {
        throw { name: 'Error403', status: 403, msg: 'Access denied!!'}
      }
    })
    .catch((err) => {
      next(err)
    });
  }
}

module.exports = authorization