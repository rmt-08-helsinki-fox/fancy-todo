const {Todo} = require('../models/index')

function authorize(req,res,next){

  Todo.findByPk(req.params.id)
    .then(data => {
      if(!data) throw ({name: 'customError', msg: 'Data not found', status: 404})
      if(req.decoded.id == data.UserId){
        next()
      }else{
        throw ({name: 'customError', msg: 'You dont have permission to this Todo', status: 403})
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorize