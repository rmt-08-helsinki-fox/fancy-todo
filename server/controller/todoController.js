//@ts-check

const { Todo } = require('../models/index')
const axios = require("axios").default

class todoController {
    static PostAddTodo (req, res, next) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || false,
            due_date: req.body.due_date,
            UserId: +req.decoded.id
        }

        Todo.create(newTodo)
        .then((todo)=> {
            res.status(201).json(todo)
        })
        .catch((err) => {
            next(err)
        })
    }

    static getTodo (req, res, next) {
        let todo;
        Todo.findAll({
            order: [['id', 'DESC']],
            where: {
                UserId: +req.decoded.id
            }
        })
        .then((todos) => {
            todo = todos
            return axios({
                method: "get",
                url: "https://api.quotable.io/random"
            })
        })
        .then(quotes => {
            res.status(200).json([quotes.data, todo])
        })
        .catch(err => {
            next(err)
        })
    }

    static findTodo(req, res, next) {
        Todo.findByPk(+req.params.id)
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err=>{
            next(err)
        })
    }
    

    static putTodo(req, res,next) {
        let updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        let option = {
            where: {id: req.params.id},
            returning: true
        }

        Todo.update(updateTodo, option)
        .then(todo => {

            res.status(200).json(todo[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static patchTodo (req,res,next) {
        let patch = {
            status: req.body.status
        }
        let option = {
            where: {id: +req.params.id},
            returning: true
        }

        Todo.update(patch, option)
        .then(todo => {
            res.status(200).json(todo[1][0])
        })
        .catch(err=>{
            next(err)
        })

    }

    static destroyTodo (req, res, next) {
        let todoId = +req.params.id
        
        Todo.destroy({
            where:
            {id: todoId},
        })
        .then(todo => {
            res.status(200).json({msg: 'todo success to delete'})
        })
        .catch(err => {
            next(err)
        })

    }

}

module.exports = todoController