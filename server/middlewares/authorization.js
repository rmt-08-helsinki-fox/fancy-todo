const {Todo} = require('../models/index')

function authorization(req,res,next){
    const id = +req.params.id
    const loginId = req.decoded.id
    Todo.findOne({
        where:{
            id
        }
    })
    .then(data=>{
        // console.log("login id",loginId);
        // console.log(data.UserId);
        if(Number(data.UserId) === loginId){
            next()
        }else{
            throw({message : "User not authorized"})
        }
    })
    .catch(err=>{
        res.status(403).json(err)
    })
}

module.exports = authorization