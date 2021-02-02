// findOne user, where user.email = email , dapat melihat menghapus update
const { User, Todo } = require('../models')

const authorize = function(req, res, next) {
  Todo.findOne({
    where: {
      id: +req.params.id
    }
  })
    .then(data =>{
      console.log(data)
      if (data.UserId === +req.decoded.id) {
        next()
      } else {
        res.status(401).json({
          message: [`Not Authorized`]
        })
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorize 