const {Todo} = require("../models/")

class TodoController {
    static create(req , res) {
        console.log("ini di todocontroller")
        const {title, description, status, due_date} = req.body
        const todoData = {title, description, status, due_date}
        Todo.create(todoData)
        .then(data =>{
            console.log(data)
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readAllTodos(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static todoFindById(req, res) {
        Todo.findOne({
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw res.status(505)
            }
    
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static putTodoById(req, res) {
        const {title, description, status, due_date} = req.body
        const todoData = {title, description, status, due_date}
        Todo.update(todoData, {
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }

    static patchTodoById(req, res) {
        const {status} = req.body
        const newStatus = {status}
        Todo.findOne({
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            data.status = newStatus
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTodo(req, res) {
        Todo.destroy({
            where :{
                id : +req.params.id
            }
        })
        .then(data => {
            if (data > 0) {
                res.status(200).json(data)
            } else {
                throw res.status(500)
            }
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }
}

module.exports = TodoController

