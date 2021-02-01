const {Todo} = require("../models/index")

class Controller{

    static showTodo(req,res){
        Todo.findAll()
        .then((todoData)=>{
            res.status(200).json(todoData)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

    static postTodo(req, res){
        const {title, description, status, due_date} = req.body
        let newTodo = {
            title, 
            description, 
            status, 
            due_date
        }
        Todo.create(newTodo)
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((err)=>{
            if (err.name === "SequelizeValidationError") {
                let errors = err.errors.map(error=>error.message)
                res.status(400).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static getTodo(req,res){
        const {id} = req.params 
        Todo.findOne({
            where:{
                id : +id
            }
        })
        .then((todo)=>{
            if (todo) {
                res.status(200).json(todo)
            } else {
                throw {msg:"error not found"}
            }
        })
        .catch((err)=>{
            let error = err.msg
            res.status(404).json(error)
        })
    }

    static putTodo(req,res){
        const {id} = req.params 
        const {title, description, status, due_date} = req.body
        let editTodo = {
            title, 
            description, 
            status, 
            due_date
        } 
        Todo.update(editTodo,{
            where:{
                id : +id
            },
            returning:true
        })
        .then((result)=>{
            if (result[0] === 1) {
                res.status(200).json(result)
            } else {
                throw {
                    name:"NotFound",
                    msg:"error not found"
                }
            }
        })
        .catch((err)=>{
            if (err.name === "SequelizeValidationError") {
                let errors = err.errors.map(error=>error.message)
                res.status(400).json(errors)
            } else if (err.name === "NotFound") {
                let errors = err.msg
                res.status(404).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static patchTodo(req,res){
        const {id} = req.params 
        const {status} = req.body
        let editTodo = {status} 
        Todo.update(editTodo,{
            where:{
                id : +id
            },
            returning:true
        })
        .then((result)=>{
            if (result[0] === 1) {
                res.status(200).json(result)
            } else {
                throw {
                    name:"NotFound",
                    msg:"error not found"
                }
            }
        })
        .catch((err)=>{
            if (err.name === "SequelizeValidationError") {
                let errors = err.errors.map(error=>error.message)
                res.status(400).json(errors)
            } else if (err.name === "NotFound") {
                let errors = err.msg
                res.status(404).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static deleteTodo(req,res){
        const {id} = req.params
        Todo.destroy({
            where:{
                id :+id
            }
        })

        .then((deletedTodo)=>{
            if (deletedTodo) {
                res.status(200).json("todo success to delete")
            } else {
                throw {
                    name:"NotFound",
                    msg:"error not found"
                }
            }
        })

        .catch((err)=>{
            if (err.name === "NotFound") {
                let errors = err.msg
                res.status(404).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }
}

module.exports = Controller