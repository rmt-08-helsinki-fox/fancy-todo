const {Todo, User} = require("../models/index")

class TodoController{

    static showTodo(req,res,next){
        const UserId = req.decoded.id
        Todo.findAll({where:{
            UserId
        }})
        .then((todoData)=>{
            res.status(200).json(todoData)
        })
        .catch((err)=>{
            next(err)
        })
    }

    static postTodo(req, res, next){
        const {title, description, status, due_date} = req.body
        const {id} = req.decoded
        let newTodo = {
            title,
            description,
            status,
            due_date,
            UserId: id
        }
        Todo.create(newTodo)
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((err)=>{
            next(err)
        })
    }

    static getTodo(req,res,next){
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
                throw({
                    name:"NotFound",
                    msg:"error not found"
                })
            }
        })
        .catch((err)=>{
            next(err)
        })
    }

    static putTodo(req,res,next){
        const {id} = req.params
        const UserId = req.decoded.id
        const {title, description, status, due_date} = req.body
        let editTodo = {
            title, 
            description, 
            status, 
            due_date,
            UserId
        }
        console.log(editTodo);
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
            next(err)
        })
    }

    static patchTodo(req,res,next){
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
            next(err)
        })
    }

    static deleteTodo(req,res,next){
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
            next(err)
        })
    }
}

module.exports = TodoController