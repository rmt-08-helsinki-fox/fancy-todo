const { Todo } = require('../models/index')

const authorize = (req,res,next) => {
    let selectedId = req.params.id

    Todo.findByPk(selectedId)
      .then( todo => {

        if(!todo){
          throw { 
            name: "customError", 
            message: "error not found",
            status: 404 
          }
        } else if (req.user.id == todo.UserId ){
            next()
        } else {
          throw { 
            name : "customError",
            message : 'Not Authorized',
            status: 401
          }
        }

      })
      .catch( err => {
        next(err)
      })

    

}

module.exports = authorize
