const {Todo} = require('../models')

const TodoAuthorization = (req, res, next) => {

    // console.log('authorization')
    // console.log(req)
    Todo.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((result)=>{
        if(result){
            if(result.UserId === req.userData.id){
                next()
            }else{
                next({name: 'NOT_AUTHORIZED'})
            }
        }else{
            next({name: 'TODO_NOT_FOUND'})
        }
    })
    .catch((err)=>{
        next(err)
    })
    
}


module.exports={
    TodoAuthorization
}