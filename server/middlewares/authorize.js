// findOne user, where user.email = email , dapat melihat menghapus update
const { User, Todo } = require('../models')

const authorize = function(req, res, next) {
  let obj = {}
  console.log(req.decoded.id)
  User.findOne({
    where: {
      id: req.params.id,
      email: req.decoded.email
    }
  })
    .then(data =>{
      console.log(data)
      next()
    })
    .catch(err => {
      res.status(401).json({
        message: `Not Auhtorized`
      })
    })
}

module.exports = authorize 