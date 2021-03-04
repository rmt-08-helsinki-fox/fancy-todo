const { Todo } = require('../models')

const authorize = function (req, res, next) {
    Todo.findOne({
        where: {
            id: req.params.id
        }
    }).then(found => {
        if (found.UserId !== req.decoded.id) throw 'invalid'
        next()
    }).catch(err => {
        console.log(err)
        if (err === 'invalid') {
            res.status(400).json({ msg: 'Invalid User' })
        } else {
            res.status(500).json(err)
        }
    })
}

module.exports = { authorize }