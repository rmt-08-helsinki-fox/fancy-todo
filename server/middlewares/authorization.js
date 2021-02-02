const { User, Todo } = require('../models/index')

const authorize = (req, res, next) => { 
  Todo.findOne({
    where: {
      id: +req.params.id
    }
  })
  .then(todo => {
    if (!todo) {
      throw {msg: "404 not found!", status: 404}
    }
    if (+req.decoded.id == +todo.UserId ) {
      next()
    } else {
      throw {msg: 'Not Authorized', status: 401}
    }
  })
  .catch(err => {
    next(err)
    //res.status(401).json({err})
  })
}

module.exports = authorize