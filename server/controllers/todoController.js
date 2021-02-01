const { Todo } = require('../models')

class TodoController {
    static createTodo(req,res) {
        console.log(req.body)
        let {title, description, status, due_date} = req.body
        let dataTodo = {title, description, status, due_date}
        
        Todo.create(dataTodo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err=> {
                res.status(500).json(err)
            })
    }
    static getTodo(req,res) {
        Todo.findAll()
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err=> {
                res.status(500).json(err)
            })
    }
    static findOneTodo(req,res) {
        console.log(req.params.id)
        const id = +req.params.id
        Todo.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err=> {
                res.status(500).json(err)
            })
    }
    static editTodo(req,res) {
        const id = +req.params.id
        const {title, description, status, due_date} = req.body
        const dataTodo = {title, description, status, due_date}
        Todo.update(dataTodo, {
            where: {
                id : id
            },
            returning:true
        })
            .then(data => {
                console.log(data)
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static editStatusTodo(req,res) {
        const id = +req.params.id
        const {title, description, status, due_date} = req.body
        const dataTodo = {title, description, status, due_date}

        Todo.update(dataTodo, {
            where: {
                id : id
            },
            returning: true
        })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static deleteTodo(req,res) {
        const id = +req.params.id
        Todo.destroy({
            where: {
                id: id
            },
            returning: true
        })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}


module.exports = TodoController