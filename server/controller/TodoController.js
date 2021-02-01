const { Todo } = require('../models')

class TodoController {

    static addTodo(req, res) {
        const { title, description, status, due_date } = req.body
        Todo.create({
            title, description, status, due_date
        }).then(todo => {
            res.status(201).json(todo)
        }).catch(err => {
            if (err.errors.length > 0) {
                let message = []
                err.errors.forEach(el => {
                    message.push(el.message)
                })
                res.status(400).json(message)
            } else {
                res.status(500).json({ msg: "Internal Server Error" })
            }
        })
    }

    static getList(req, res) {
        Todo.findAll()
            .then(todo => {
                res.status(200).json(todo)
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    static getData(req, res) {
        let id = +req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if (todo !== null) {
                    res.status(200).json(todo)
                } else {
                    res.status(404).json({ msg: "Data Not Found" })
                }
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    static updateData(req, res) {
        let id = +req.params.id
        const { title, description, status, due_date } = req.body
        Todo.update({
            title, description, status, due_date
        }, {
            where:
                { id },
            returning: true
        })
            .then(todo => {
                if(todo[0] === 1){
                    res.status(200).json(todo[1])
                }else{
                    res.status(404).json({msg : "Data Not Found"})
                }
            }).catch(err => {
                if (err.errors.length > 0) {
                    let message = []
                    err.errors.forEach(el => {
                        message.push(el.message)
                    })
                    res.status(400).json(message)
                } else {
                    res.status(500).json({ msg: "Internal Server Error" })
                }
            })
    }

    static updateStatus(req, res) {
        let id = +req.params.id
        const { status } = req.body
        Todo.update({
            status
        }, {
            where:
                { id },
            returning: true
        })
            .then(todo => {
                if(todo[0] === 1){
                    res.status(200).json(todo[1])
                }else{
                    res.status(404).json({msg : "Data Not Found"})
                }
            }).catch(err => {
                if (err.errors.length > 0) {
                    let message = []
                    err.errors.forEach(el => {
                        message.push(el.message)
                    })
                    res.status(400).json(message)
                } else {
                    res.status(500).json({ msg: "Internal Server Error" })
                }
            })
    }

    static deletedData(req, res) {
        let id = +req.params.id
        Todo.destroy({
            where:
                { id }
        })
            .then(todo => {
                if(todo === 1){
                    res.status(200).json({msg : "todo success to delete"})
                }else{
                    res.status(404).json({msg : "Data Not Found"})
                }
            }).catch(err => {
                  res.status(500).json({ msg: "Internal Server Error" })
            })
    }
    
}

module.exports = TodoController