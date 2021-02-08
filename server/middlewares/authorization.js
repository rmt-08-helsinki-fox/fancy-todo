const { Todo } = require('../models')

function authorize(req, res, next) {
  const id = +req.params.id

  Todo.findOne({
    where: { id }
  })
    .then(data => {
      if (!data) {
        next({
          name: 'Data not found'
        })
      } else if (data.userID !== req.user.id) {
        next({
          name: 'Not authorized'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorize