const {Todo, User} = require("../models/")

class TodoController {
    static create(req , res, next) {
        let input = {
            title : req.body.title,
            description : req.body.description,
            status : false,
            due_date : req.body.due_date,
            UserId : req.decoded.id
        }
        Todo.create(input)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static readAllTodos(req, res, next) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static todoFindById(req, res, next) {
        Todo.findByPk({
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            console.log(data)
            if (!data) {
                throw {
                   name : customError,
                   msg: `Invalid Id`,
                   status: 404
                }
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateTodo(req, res, next) {
        const {title, description, status, due_date} = req.body
        const todoData = {title, description, status, due_date}
        Todo.update(todoData, {
            where: {
                id : +req.params.id
            },
            returning : true
        })
        .then(data => {
            if (data[0] !== 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    name: "customError",
                    msg : "Invalid ID",
                    status: 404
                })
            }
            
        })
        .catch(err => {
            next(err)
        })
    }

    static updateStatusTodo(req, res, next) {
        let input = {
            title,
            description ,
            status : true,
            due_date,
            UserId
        }
        Todo.update(input, {
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            if (data[0] !== 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    name: "customError",
                    msg : "Invalid ID",
                    status: 404
                })
            }
            
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({
            where :{
                id : +req.params.id
            }
        })
        .then(data => {
            if (data > 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    name: "customError",
                    msg : "Invalid ID",
                    status: 404
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController

