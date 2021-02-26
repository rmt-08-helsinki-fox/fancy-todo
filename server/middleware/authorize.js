const {User, Todo} = require('../models')

const authorize = function (req, res, next) {
  const idTodo = +req.params.id
  const{ id } = req.decode
  User.findOne({
    where: {
      id
    },
    include: [Todo] 
  }) .then(data => {
    let checkId = false
    for (let i = 0; i < data.Todos.length; i++) {
      if(data.Todos[i].id === idTodo) {
        checkId = true
      }
    }
    if(checkId) {
      next()
    }
    else {
      const err = {
        name: 'cannot acces',
        msg: 'cannot acces'
      }
      next(err)
    }
  }) .catch(err => {
    next(err)
  })
}

module.exports = authorize