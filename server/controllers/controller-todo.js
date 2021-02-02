const {Todo} = require('../models')

class ControllerTodo{
    static createTodo(req, res){
        const {title, description, status, due_date} = req.body
        console.log(req.body)
        Todo.create({
            title, description, status, due_date,
            UserId: req.decoded.id
        })
        .then(data=>{
            console.log(data)
            res.status(201).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    static getTodo(req, res){
        Todo.findAll()
        .then(todos=>{
            res.status(200).json(todos)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static getTodoById(req, res){
        Todo.findByPk(req.params.id)
        .then(todo=>{
            res.status(200).json(todo)
            // console.log(todo)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static putTodoUpdate(req, res){
        const {title, description, status, due_date} = req.body
        const id = +req.params.id

        Todo.update({
            title, description, status, due_date
        },{
            where: {
                id
            },
            returning: true
        })
        .then(todo =>{
            res.status(200).json(todo[1][0])
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static patchTodoUpdate(req, res){
        const id = +req.params.id
        const {title, description, status, due_date} = req.body

        Todo.update({
            title, description, status, due_date
        },{
            where :{
                id
            },
            returning: true
        })
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static deleteTodo(req, res){
        const id = +req.params.id

        Todo.destroy({
            where:{
                id
            },
            
        })
        .then(todo=>{
            res.status(200).json(todo)
            console.log(todo)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = ControllerTodo