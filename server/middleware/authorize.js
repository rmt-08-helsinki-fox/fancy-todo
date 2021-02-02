const { Todo } = require('../models/index')

const authorize = (req, res, next) => {
    const option = {
        where: {
          id: +req.params.id
        }
    }
    console.log(+req.params.id)
    Todo.findOne(option)
        .then(todo => {
            if (todo.user_id === +req.user.id){
                next()
            }else {
                res.status(401).json({ msg: "Access not permitted" })
            }
        })
        .catch(err => {
            res.status(404).json({ msg: "Data not found" })
        })
    
}


module.exports = authorize