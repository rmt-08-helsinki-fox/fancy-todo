const { Todo } = require('../models')

// const authorizeByRole = function(req, res, next){
//     const id = req.decoded.id
//     try {
//         Todo.findOne({where : {
//             UserId : id
//         }})
//         .then(data => {
//             next()
//         })
//     } catch (error) {
//         res.status(401).json({
//             message: 'Invalid Token'
//         })
//     }
    
// }

const authorize = function(req, res, next){
  const id = req.decoded.id
  const paramsId = +req.params.id
  Todo.findOne({where : {
    id: paramsId
  }})
  .then(todo => {
    if(!todo){
      throw { name:'DataNotFound', message: "Data not found" } 
    } else if(todo.UserId !== id) {
      throw { name: 'UnauthorizedUser', message: 'Unauthorized User'}
    } else {
      next()
    }
  })
  .catch(err => {
    next(err)
  })
}


module.exports = authorize