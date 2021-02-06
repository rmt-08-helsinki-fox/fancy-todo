const {Todo} = require('../models/index')

const authorize = function (req,res,next) {
    console.log('awang dari authorize')
    Todo.findOne({
        where: {id : +req.params.id}
    }).then(data => {
        if(data){
            if (req.decoded.id === data.UserId) {
                next()
            }else{
                throw({  
                    name: "AuthorizedFail",
                    msg : "Not Authorized"
                    })
            }
        }else{
            throw ({name:'dataNothing' ,
                    msg:"Data Not Found"})
        }
    }).catch(err =>{
        next(err)
    })
    
}

module.exports = authorize