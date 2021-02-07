const {Todo} = require('../models')

class ControllerTodo{
    static createTodo(req, res, next){
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
            console.log(err)
            res.status(500).json(err)
            // next(err)
        })
    }

    static getTodo(req, res, next){
        Todo.findAll({
            where: {
                UserId : req.decoded.id
            }
        })
        .then(todos=>{
            // console.log(req.decoded,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            res.status(200).json(todos)
        })
        .catch(err=>{
            // res.status(500).json(err)
            next(err)
        })
    }

    static getTodoById(req, res, next){
        Todo.findByPk(req.params.id)
        .then(todo=>{
            res.status(200).json(todo)
            // console.log(todo)
        })
        .catch(err=>{
            // res.status(500).json(err)
            next(err)
        })
    }

    static putTodoUpdate(req, res, next){
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
            // res.status(500).json(err)
            next(err)
        })
    }

    static patchTodoUpdate(req, res, next){
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
            // res.status(500).json(err)
            next(err)
        })
    }

    static deleteTodo(req, res, next){
        const id = +req.params.id

        Todo.destroy({
            where:{
                id
            }  
        })
        .then(todo=>{
            res.status(200).json({msg : 'delete success'})
            // console.log(todo)
        })
        .catch(err=>{
            // res.status(500).json(err)
            next(err)
        })
    }
}

module.exports = ControllerTodo