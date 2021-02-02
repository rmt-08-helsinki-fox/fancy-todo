const {Todo} = require("../models")
const authorize = (req,res,next)=>{
    const{id} = req.params
    const UserId = +req.decoded.id
    Todo.findOne({
        where:{
            id:+id
        }
    })
    .then((todo)=>{
        if (!todo) {
            throw {
                name : "NotFound",
                msg:"Invalid Todo Id"
            }   
        }
        if (todo.UserId === UserId) {
            next()
        } else {
            throw {
                name : "NotAuthorize",
                msg:"Not Authorize"
            } 
        }
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = authorize