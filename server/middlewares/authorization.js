const { Todo } = require('../models/')

const authorization = function (req, res, next) {
  const id = +req.params.id

  if (!id) {
    res.status(400).json({ error: 'Invalid Input'})
  } else {
    Todo.findByPk(id)
    .then((data) => {
      if(!data) throw { status: 404, msg: 'Task Not Found'}
      if (data.user_id === req.decoded.id) {
        next()
      } else {
        throw { status: 401, msg: 'Access denied!! you not authorized'}
      }
    })
    .catch((err) => {
      next(err)
    });
  }
}

module.exports = authorization