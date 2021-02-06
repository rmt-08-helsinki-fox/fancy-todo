const { Todo } = require('../models')

function authorize (req,res,next) {
    const id = +req.params.id
    Todo.findOne({
        where:{
            id
        }
    })
        .then(data =>{
            if(+req.data.id === data.UserId) {
                next()
            } if (!data){
                res.status(400).json({msg: "No data", statusCode: 400})
                throw {msg: "No data", statusCode: 400}
            } else {
                res.status(401).json({msg:"Not Authorized", statusCode: 401})
                throw {msg:"Not Authorized", statusCode: 401 }
            }
        })
        .catch(err => {
            // next(err)
            console.log(err)
        })
}
module.exports = authorize