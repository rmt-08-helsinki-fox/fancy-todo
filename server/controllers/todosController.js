const { Todo } = require('../models')


class Controller {
    static async add(req, res) {
        try {
            const { title, description, status, due_date } = req.body
            const newTodo = await Todo.create({
                title, description, status, due_date, UserId: req.currentUser.id
            })

            res.status(201).json(newTodo)
        } catch (error) {
            // console.log(error);
            let errorTypes = error.errors.map(e => {
                return e.type
            })
            let errorMessages = error.errors.map(e => {
                return e.message
            })

            if (errorTypes && errorTypes.length > 0) {
                res.status(400).json({ error: { code: 400, messages: errorMessages || 'invalid input' } })
            } else {
                res.status(500).json({ error: { code: 500, message: 'internal server error' } })
            }
        }
    }

    static async getTodos(req, res) {
        try {
            // console.log(req.currentUser, '...,.,.,.,.,.,.<><><><><><><><');
            const todos = await Todo.findAll()
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json({ error: { code: 500, message: 'internal server error' } })
        }
    }

    static async getTodo(req, res) {
        try {
            const todoId = +req.params.id
            const todo = await Todo.findByPk(todoId)

            if (todo) {
                res.status(200).json(todo)
            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'id was not found'
                    }
                }
            }

        } catch (error) {

            const errorCode = error.error.code
            if (errorCode === 404) {
                res.status(404).json(error) //not found
            } else {

                res.status(500).json({ error: { code: 500, message: 'internal server error' } })
            }
        }
    }

    static async putTodo(req, res) {
        try {
            const todoId = +req.params.id
            const { title, description, status, due_date } = req.body
            const updatedTodo = await Todo.update({ title, description, status, due_date }, { where: { id: todoId }, returning: true })

            if (updatedTodo[0]) {
                res.status(200).json(updatedTodo[1])
            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'id was not found'
                    }
                }
            }
        } catch (error) {
            if (error.errors) {
                let errorMessages = error.errors.map(e => {
                    return e.message
                })
                let errorTypes = error.errors.map(e => {
                    return e.type
                })

                if (errorTypes) {
                    res.status(400).json({ error: { code: 400, messages: errorMessages } })
                } else {
                    res.status(500).json({ error: { code: 500, message: 'internal server error' } })
                }
            } else if (error.error.code) {
                res.status(404).json(error)
            } else {
                res.status(500).json({ error: { code: 500, message: 'internal server error' } })
            }
        }
    }

    static async patchTodo(req, res) {
        try {
            const todoId = +req.params.id
            let updatedTodo = {}
            const key = "status"
            const { status } = req.body
            

            updatedTodo = await Todo.update({ status }, { where: { id: todoId }, returning: true })

            if (updatedTodo[0]) {
                res.status(200).json(updatedTodo[1])
            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'id was not found'
                    }
                }
            }


        } catch (error) {

            if (error.errors) {
                if (errors.length > 0) {
                    res.status(400).json({ error: { code: 400, message: 'invalid input' } })
                } else {
                    res.status(500).json({ errors: { code: 500, message: 'internal server error' } })
                }

            } else {
                res.status(400).json(error)
            }
        }

    }

    static async deleteTodo(req, res) {
        try {
            const todoId = req.params.id
            const deletedTodo = await Todo.destroy({ where: { id: todoId } })
            if (deletedTodo) {
                res.status(200).json({ message: 'a todo was deleted' })
            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'id was not found'
                    }
                }
            }
        } catch (error) {
            const errors = error.errors
            if (errors) {
                res.status(500).json({ errors: { code: 500, message: 'internal server error' } })
            } else {
                res.status(404).json(error)
            }
        }
    }
}

module.exports = Controller