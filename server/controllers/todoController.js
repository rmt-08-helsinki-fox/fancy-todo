const { Todo } = require('../models')

class TodoController {
    static addTodo(req, res) {
        let { title, description, status, due_date} = req.body
        let obj = {
            title,
            description,
            status,
            due_date
        }
        Todo.create(obj)// err validate belum
            .then(function(newTodo) {
                res.status(201).json(newTodo)
            }).catch(function(err) {
                res.status(500).json(err)
            })
        
    }

    static getAll(req, res) {
        Todo.findAll()
            .then(function(todos) {
                res.status(200).json(todos)
            }).catch(function(err) {
                res.status(500).json(err)
            })
    }

    static getById(req, res) {
        let id = req.params.id
        Todo.findOne({
            where: {
                id
            }
        }).then(function(todo) {
            res.status(200).json(todo)
        }).catch(function(err) {
            res.status(404).json(err)
        })
    }

    static editPutById(req, res) {
        
        // console.log('editPutById');
    }

    static editPatchById(req, res) {
        console.log('editPatchById');
    }

    static destroy(req, routes) {
        console.log('destroy');
    }
}

module.exports = TodoController