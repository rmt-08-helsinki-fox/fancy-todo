//@ts-check

const { Todo } = require('../models/index')

class todoController {
    static PostAddTodo (req, res, next) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(newTodo)
        .then((todo)=> {
            res.status(201).json(todo)
        })
        .catch((err) => {
            next(err)
            // const error = err.errors[0].message
            // if(error) {
            //     res.status(400).json(error)
            // } else {
            //     res.status(500).json({msg: 'Internal server error'})
            // }
        })
    }

    static getTodo (req, res, next) {
        Todo.findAll({order: [['id', 'ASC']]})
        .then((todos) => {
            res.status(200).json(todos)
        })
        .catch(err => {
            next(err)
            //res.status(500).json(err)
        })
    }

    static findTodo(req, res, next) {
        Todo.findByPk(+req.params.id)
        .then(todo => {
            // if (!todo) {
            //     throw {msg: "404 not found!", status: 404}
            // }
            res.status(200).json(todo)
        })
        .catch(err=>{
            next(err)
            //res.status(404).json(err)
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
            returning: true}

        Todo.update(updateTodo, option)
        .then(todo => {
            // if (todo[1].length == 0) {
            //     throw {msg: "404 not found!", status: 404}
            // }
            res.status(200).json(todo[1][0])
        })
        .catch(err => {
            next(err)
            // if (err.msg == '404 not found') {
            //     res.status(404).json(err) 
            // } else if (err.errors[0].message) {
            //     res.status(400).json({msg: err.errors[0].message})
            // } else {
            //     res.status(500).json(err)
            // }
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
            // if (todo[1].length == 0) {
            //     throw {msg: "404 not found!", status: 404}
            // }
            res.status(200).json(todo[1][0])
        })
        .catch(err=>{
            next(err)
            // if (err.msg == '404 not found') {
            //     res.status(404).json(err) 
            // } else if (err.errors[0].message) {
            //     res.status(400).json({msg: err.errors[0].message})
            // } else {
            //     res.status(500).json(err)
            // }
        })

    }

    static destroyTodo (req, res, next) {
        let todoId = +req.params.id
        
        Todo.destroy({
            where:
            {id: todoId},
        })
        .then(todo => {
            // if (!todo) {
            //     throw {msg: "404 not found", status: 404}
            // }
            res.status(200).json({msg: 'todo success to delete'})
        })
        .catch(err => {
            next(err)
            // if (err.msg == '404 not found') {
            //     res.status(404).json(err) 
            // } else {
            //     res.status(500).json(err)
            // }
        })

    }
}

module.exports = todoController