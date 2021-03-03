const {Todo} = require('../models')

const authorization = async (req, res, next) => {
    try {
        const id = +req.params.id
        const selected = await Todo.findByPk(id)
        
        if(!selected) throw({name: 'custom', msg: 'Error not found'})
        else if(selected.UserId !== req.decoded.id) throw({name: 'custom', msg: 'Not authorized'})
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {authorization}