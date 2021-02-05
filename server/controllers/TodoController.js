const { Todo } = require('../models/index')

class TodoController{

    static showTodo(req,res){
        let UserId = req.decoded.id
        Todo.findAll({
            where: {
                UserId
            },
          })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

    static postTodo(req, res){
        const UserId = req.decoded.id
        const {title, description, status, due_date} = req.body
        let newTodo = {
            title, 
            description, 
            status, 
            due_date,
            UserId
        }
        Todo.create(newTodo)
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((err)=>{
            
                res.status(500).json(err)
        })
    }

    static deleteTodo(req,res){
        const id = +req.params.id
        Todo.destroy({
            where:{
                id
            }
        })
        .then((data)=>{
            if(data){
                res.status(200).json(`todo success to delete`)
            }
            else{
                res.status(404).json({message : `error not found`})
            }
        })

        .catch((err)=>{
                res.status(500).json(err)
        })
    }

    static getTodoId(req,res){
        const id = +req.params.id
        Todo.findByPk(id)
        .then((data) => {
            if(data){
            // console.log(data);
            res.status(200).json(data)
        }
            else{
            res.status(404).json('error not found')
        }
        }).catch((err) => {
            res.status(404).json(err)
        });
    }

    static putTodo(req,res){
        const {title, description, status, due_date} = req.body
        let id = +req.params.id
        let newTodo = {
            title, 
            description, 
            status, 
            due_date
        }
        Todo.update(newTodo, {
            where:{
                id
            },
            returning: true
        })
        .then((result)=>{
            if(result)
            res.status(200).json(result)
            else
            res.status(400).json(`error not found`)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })

    }

    static patchTodo(req,res){
        const {status} = req.body
        let id = +req.params.id
        let newTodo = {
            status 
        }
        Todo.update(newTodo, {
            where:{
                id
            },
            returning: true
        })
        .then((result)=>{
            if(result)
            res.status(200).json(result)
            else
            res.status(400).json(`error not found`)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }


}

module.exports = TodoController