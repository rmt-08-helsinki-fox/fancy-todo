const {Todo} = require('../models')

const authorization = async (req, res, next) => {
    try {
        const selected = await Todo.findOne({where: {UserId: req.decoded.id}})
        
        if(!selected || selected.id !== +req.params.id) throw({name: 'custom', msg: 'Not authorized'})
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {authorization}