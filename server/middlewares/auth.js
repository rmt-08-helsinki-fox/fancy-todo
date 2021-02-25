const jwt = require('jsonwebtoken')
const { Todo } = require('../models')

const authenticate = function (req, res, next) {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)

        req.decoded = decoded
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Please Login First',
        })
    }
}

const authorize = function (req, res, next) {
    const id = +req.params.id
    console.log(req.params,'<<<<<<<<<<<ini req.params');
    Todo.findOne({ where: { id: id } })
        .then(data => {
            if (!data) {
                throw ({ name: 'Not Found Error', message: 'Data Todo Not Found' })
            } else if (req.decoded.id !== data.UserId) {
                throw ({ name: 'Forbidden', message: 'You Dont Have to Access' })
            } else {
                next()
            }
        })

        .catch(err => {
            console.log(err);
            next(err)
        })

}



module.exports = {
    authenticate,
    authorize
}