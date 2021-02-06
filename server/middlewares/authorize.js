const { Todo } = require('../models')

const authorize = function (req, res, next) {

    const todoId = +req.params.id

    Todo.findByPk(todoId)
        .then(data => {
            if(data){
                if (data.UserId === req.currentUser.id) {
                    next()
                } else {
                    throw {
                        name: 'Custom error',
                        error: {
                            code: 401,
                            messages: ['user is not authorized']
                        }
                    }
                }
            } else {
                throw {
                    name: 'Custom error', 
                    error: {
                        code: 404,
                        messages: ['id was not found']
                    }
                }
            }
        })
        .catch(error => {
            next(error)
        })



}

module.exports = { authorize }