const {todo} = require('../models/')

const authorize = (req, res, next) =>{
    todo.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((todo) => {
        if(!todo) throw  {name:'customError' ,code: 404 ,msg:'data not found'}
        if(req.decode.id != todo.UserId){
            throw {name:'customError' ,code: 401,msg:'cannot accses this todo'}
        }else{
            next()
        }
    }).catch((err) => {
        next(err)
    });
}

module.exports= authorize