const { Todo } = require('../models')

class TodoController {
    static add(req, res) {

    }

    static addPost(req, res) {
        const { title, description, status, dueDate } = req.body
        Todo.create({
            title: title,
            description: description,
            status: status,
            dueDate: dueDate
        }, {
            returning: true
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static showAll(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findById(req, res) {
        const targetedId = Number(req.params.todoId)
        Todo.findOne({
            where: {
                id: targetedId
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }

    static update(req, res) {
        const targetedId = Number(req.params.todoId)
        const { title, description, status, dueDate } = req.body
        Todo.update({
            title: title,
            description: description,
            status: status,
            dueDate: dueDate
        }, {
            where: {
                id: targetedId
            },
            returning: true
        })
            .then(data => {
                res.status(201).json(data[1][0])
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static updateStatus(req, res) {
        const targetedId = Number(req.params.todoId)
        const { status } = req.body
        Todo.update({
            status: status
        }, {
            where: {
                id: targetedId
            },
            returning: true
        })
            .then(data => {
                res.status(201).json(data[1][0])
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        const targetedId = Number(req.params.todoId)
        Todo.destroy({
            where: {
                id: targetedId
            },
            returning: true
        })
            .then(data => {
                let msg = "Todo success to delete"
                res.status(200).json({ msg })
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }
}

module.exports = TodoController