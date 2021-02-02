const jwt = require('jsonwebtoken')
const { Todo } = require('../models')

const authorize = function authorization(req, res, next) {
    const TodoId = +req.params.id
    Todo.findByPk(TodoId)
    .then(todo => {
        if (todo.UserId === req.decoded.id){
            next()
        } else {
            res.status(401).json({error: 'Not authorized'})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'Internal server error'})
    })
}

module.exports = authorize