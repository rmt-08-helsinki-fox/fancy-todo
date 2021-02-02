const { Todo, User } = require('../models')

class TodoController {
    static showAll(req, res, next) {
        Todo.findAll({
            include: {
                model:User,
                attributes: ['email']
            },
            order: [['id', 'ASC']]
        })
        .then(data => res.status(200).json(data))
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static create(req, res, next) {
        // console.log(req.user);
        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.user.id
        }
        // console.log(value, '<<<<<<');
        Todo.create(value)
        .then(data => res.status(201).json(data))
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static getOne(req, res, next) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
          if(!data) res.status(404).json({msg: 'Data not found'})
          else res.status(200).json(data)
        })
        .catch(err => {
            const error = err.errors[0].message || 'Internal server error'
          res.status(500).json({ error })
        })
    }

    static putTodo(req, res, next) {
        let id = +req.params.id
        const {title, description, status, due_date} = req.body
        const value = {
            title,
            description,
            status,
            due_date
        }
        console.log(value, '<<<<<<<');
        Todo.update(value, {
            where: {id},
            returning: true
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

    static patchTodo(req, res, next) {
        let id = +req.params.id
        const value = {
            status: req.body.status
        }
        Todo.update(value, {
            where: {id},
            returning: true
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

    static delete(req, res, next) {
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