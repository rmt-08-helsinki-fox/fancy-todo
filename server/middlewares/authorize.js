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
                name : "notfound",
                msg:"Invalid Todo Id"
            }   
        }
        if (todo.UserId === UserId) {
            next()
        } else {
            throw {
                name : "notauthorize",
                msg:"Not Authorize"
            } 
        }
    })
    .catch((err)=>{
        if (err.name === "notfound") {
            res.status(404).json(err.msg)
        } else if(err.name === "notauthorize") {
            res.status(401).json(err.msg)
        } else {
            res.status(500).json(err)
        }
    })
}

module.exports = authorize