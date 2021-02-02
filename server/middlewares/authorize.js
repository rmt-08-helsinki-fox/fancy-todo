const {todo} = require('../models/')

const authorize = (req, res, next) =>{
    todo.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((todo) => {
        if(req.decode.id != todo.UserId){
            throw {msg:'cannot accses this todo'}
        }else{
            next()
        }
    }).catch((err) => {
        res.status(400).json({err:err.msg})
    });
}

module.exports= authorize