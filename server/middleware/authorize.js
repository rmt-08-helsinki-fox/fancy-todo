const { Todo } = require('../models')

const authorize = (req, res, next) => {
  Todo.findOne({ where: { id: +req.params.id } })
  .then( data => {
    if (!data) {
      throw { error: "Not Found", code: 404 }
    }
    if (data.userId === +req.user.id ) {
      next()
    } else {
      throw { error: "Not Authorized", code: 401 }
    }
  })
  .catch( err => {
    console.log(err);
    next(err)
  })
}

module.exports = authorize