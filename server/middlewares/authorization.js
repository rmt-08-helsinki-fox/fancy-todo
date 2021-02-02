const { Todo } = require('../models')

function authorize(req, res, next) {
  const id = +req.params.id

  Todo.findOne({
    where: { id }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: 'Data not found'
        })
      } else if (data.userID !== req.user.id) {
        res.status(401).json({
          message: 'Invalid user, not authorized'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

module.exports = authorize