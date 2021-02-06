// findOne user, where user.email = email , dapat melihat menghapus update
const { User, Todo } = require('../models')

const authorize = function(req, res, next) {
  Todo.findOne({
    where: {
      id: +req.params.id
    }
  })
    .then(data =>{
      if (data == null) throw { name: 'Not Found', statusCode: 404, msg: `error not found` }
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