const { Todo } = require('../models/index')

const authorize = (req,res,next) => {
    let selectedId = req.params.id

    Todo.findByPk(selectedId)
      .then( todo => {

        if(!todo){
          throw { message : 'error not found'}
        }

        if(req.user.id == todo.UserId ){
            next()
        } else {
          throw { message : 'Not Authorized'}
        }
      })
      .catch( err => {

        console.log(err)
        if(err.message == 'Not Authorized'){
          res.status(401).json(err)     
        } else if(err.message == 'error not found'){
          res.status(404).json(err)
        } else {
          res.status(500).json(err)
        }

      })

    

}

module.exports = authorize
