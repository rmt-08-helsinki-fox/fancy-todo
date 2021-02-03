const { Todo } = require('../models')

const authorize = function (req, res, next) {
    Todo.findOne({
        where: {
            UserId: req.params.id
        }
    }).then(found => {
        if (found.UserId !== req.decoded.id) throw 'invalid'
        next()
    }).catch(err => {
        if (err === 'invalid') {
            res.status(400).json({ msg: 'Invalid User' })
        }
    })
}

module.exports = { authorize }