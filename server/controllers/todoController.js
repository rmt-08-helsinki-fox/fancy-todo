const { Todo } = require('../models')

class TodoController {
    static createTodo(req,res) {
        let {title, description, status, due_date} = req.body
        let dataTodo = {title, description, status, due_date, UserId : +req.data.id}
        Todo.create(dataTodo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err=> {
                if(err.name ==="SequelizeValidationError"){
                    res.status(400).json(err.errors[0].message)
                } else {
                    res.status(500).json({message: "Invalid request"})
                }
            })
    }
    static getTodo(req,res) {
        Todo.findAll()
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err=> {
                res.status(500).json({message: "Invalid request"})
            })
    }
    static findOneTodo(req,res) {
        // console.log(req.params.id)
        const id = +req.params.id
        Todo.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
                if(data === null) {
                    res.status(404).json({message:"Invalid Data"})
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err=> {
                res.status(500).json({message: "Invalid request"})
            })
    }
    static editTodo(req,res) {
        const id = +req.params.id
        const userId = +req.data.id
        const {title, description, status, due_date} = req.body
        const dataTodo = {title, description, status, due_date, UserId: userId}
        Todo.update(dataTodo, {
            where: {
                id : id
            },
            returning:true
        })
            .then(data => {
                if(data[0] === 0){
                    res.status(404).json({message: "Invalid Data"})
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                res.status(500).json({message: "Invalid request"})
            })
    }
    static editStatusTodo(req,res) {
        const id = +req.params.id
        const userId = +req.data.id
        const {status} = req.body
        const dataTodo = {status, UserId : userId}

        Todo.update(dataTodo, {
            where: {
                id : id
            },
            returning: true
        })
            .then(data => {
                // console.log(data[1][0])
                if(data[0] === 0){
                    res.status(404).json({message:"Invalid Data"})
                } else {
                    let {id, status, createdAt, updatedAt, UserId} = data[1][0]
                    let dataOutput = {id, status, createdAt, updatedAt, UserId}
                    res.status(200).json(dataOutput)
                }
            })
            .catch(err => {
                if(err.name === "SequelizeValidationError") {
                    res.status(400).json(err.errors[0].message)
                } else {
                    res.status(500).json({message: "Invalid request"})
                }
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

                if(data === 0) {
                    res.status(404).json({message: "Invalid Data"})
                } else {
                    res.status(200).json({message : "todo success to delete"})
                }
            })
            .catch(err => {
                res.status(500).json({message: "Invalid request"})
            })
    }

}


module.exports = TodoController