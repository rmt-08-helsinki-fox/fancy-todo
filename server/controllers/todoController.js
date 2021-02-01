const { Todo } = require('../models')

class TodoController {
    static create(req, res) {
        const {title, description, status, due_date} = req.body
        const value = {
            title,
            description,
            status,
            due_date
        }
        // console.log(value, '<<<<<<');
        Todo.create(value)
        .then(data => res.status(201).json(data))
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static showAll(req, res) {
        Todo.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static getOne(req, res) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => res.status(200).json(data))
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static putTodo(req, res) {
        let id = +req.params.id
        const {title, description, status, due_date} = req.body
        const value = {
            title,
            description,
            status,
            due_date
        }
        Todo.update(value, {
            where: {id}
        })
        .then(data => {
            // console.log(data[0][0], '<<<<<<<');
            if(!data) res.status(404).json({msg: 'Data not found'})
            else res.status(200).json(data)
        })
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static patchTodo(req, res) {
        let id = +req.params.id
        const value = {
            status: req.body.status
        }
        Todo.update(value, {
            where: {id}
        })
        .then(data => {
            if(!data) res.status(404).json({msg: 'Data not found'})
            else res.status(200).json(data)
        })
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static delete(req, res) {
        let id = +req.params.id
        Todo.destroy({
            where: {id}
        })
        .then(data => {
            if(!data) res.status(404).json({msg: 'Data not found'})
            else res.status(200).json({message: 'Todo success to delete'})
        })
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }
}

module.exports = TodoController