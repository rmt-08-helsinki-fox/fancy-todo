const { Todo } = require('../models')

class TodoController {
    static addTodo(req, res, next) {
        // console.log(req.decode, 'decode');
        let { title, description, status, due_date } = req.body
        let obj = {
            title,
            description,
            status,
            due_date,
            user_id: req.decode.id
        }
        Todo.create(obj)
            .then(function(newTodo) {
                res.status(201).json(newTodo)
            }).catch(function(err) {
                // console.log(err.errors[0].path);
                // if (err.errors[0].type === 'Validation error') {
                //     res.status(400).json(err.errors[0].message)
                // } else {
                //     res.status(500).json(err)
                // }
                next(err)
            })
        
    }

    static getAll(req, res, next) {
        // console.log('getalll');
        let userId = req.decode.id
        Todo.findAll()
            .then(function(todos) {
                res.status(200).json(todos)
            }).catch(function(err) {
                res.status(500).json(err)
            })
    }

    static getById(req, res, next) {
        let id = req.params.id
        Todo.findOne({
            where: {
                id
            }
        }).then(function(todo) {
            if (!todo) {
                res.status(404).json({Message: "Data Not Found"})
            } else {
                res.status(200).json(todo)
            }
        }).catch(function(err) {
            // res.status(404).json(err)
            next(err)
        })
    }

    static editPutById(req, res, next) {
        let id = +req.params.id
        let { title, description, status, due_date} = req.body
        let newData = {
            title,
            description,
            status: false,
            due_date
        }
        Todo.update(newData, {
            where: {
                id: id
            },
            returning: true
        }).then(function(newTodo) {
            if (!newTodo[0]) {
                res.status(404).json({Message: "Data Not Found"})
            } else {
                res.status(200).json(newTodo[1])
            }
        }).catch(function(err) {
            // if (err.errors[0].type === 'Validation error') {
            //     res.status(400).json(err.errors[0].message)
            // } else {
            //     res.status(500).json(err)
            // }
            next(err)
        })
    }

    static editPatchById(req, res, next) {
        let id = +req.params.id
        let { title, description, status, due_date, user_id} = req.body
        Todo.update({
            status: true
        }, {
            where: {
                id: id
            },
            returning: true
        }).then(function(newTodo) {
            if (!newTodo[0]) {
                res.status(404).json({Message: "Data Not Found"})
            } else {
                res.status(200).json(newTodo[1])
            }
        }).catch(function(err) {
            // if (err.errors[0].type === 'Validation error') {
            //     res.status(400).json(err.errors[0].message)
            // } else {
            //     res.status(500).json(err)
            // }
            next(err)
        })
    }

    static destroy(req, res, next) {
        let id = +req.params.id
        Todo.destroy({
            where: {
                id: id
            },
            returning: true
        }).then(function(data) {
            if (!data) {
                res.status(404).json({Message: "Data Not Found"})
            } else {
                res.status(200).json({Message: "todo success to delete"})
            }
        }).catch(function(err) {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController