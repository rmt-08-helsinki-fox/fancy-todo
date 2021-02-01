const { Todo } = require('../models')


class Controller {
    static async add(req, res) {
        try {
            const { title, description, status, due_date } = req.body
            const newTodo = await Todo.create({
                title, description, status, due_date
            })

            res.status(201).json(newTodo)
        } catch (err) {
            const error = err.errors
            if (error.length > 0) {
                res.status(400).json({ error: { code: 400, message: 'invalid input' } })
            } else {
                res.status(500).json({ error: { code: 500, message: 'internal server error' } })
            }
        }
    }

    static async getTodos(req, res) {
        try {
            const Todos = await Todo.findAll()
            res.status(200).json(Todos)
        } catch (err) {
            res.status(500).json({ error: { code: 500, message: 'internal server error' } })
        }
    }

    static async getTodo(req, res) {
        try {
            const targetId = +req.params.id
            const findTodo = await Todo.findByPk(targetId)

            if (findTodo) {
                res.status(200).json(findTodo)
            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'id was not found'
                    }
                }
            }

        } catch (err) {

            res.status(404).json(err) //not found
        }
    }

    static async putTodo(req, res) {
        try {
            const targetId = +req.params.id
            const { title, description, status, due_date } = req.body
            const newTodo = await Todo.update({ title, description, status, due_date }, { where: { id: targetId }, returning: true })

            if (newTodo[0]) {
                res.status(200).json(newTodo[1])
            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'id was not found'
                    }
                }
            }
        } catch (err) {
            const errors = err.errors

            if (errors) {
                if (errors.length > 0) {
                    res.status(400).json({ error: { code: 400, message: 'invalid input' } })
                } else {
                    res.status(500).json({ error: { code: 500, message: 'internal server error' } })
                }

            } else {
                res.status(404).json(err)
            }
        }
    }

    static async patchTodo(req, res) {
        try {
            const targetId = +req.params.id
            const { title, description, status, due_date } = req.body
            let newTodo = {}
            const key = Object.keys(req.body)
            newTodo = await Todo.update({ [key[0]]: req.body[key[0]] }, { where: { id: targetId }, returning: true })

            if (newTodo[0]) {
                res.status(200).json(newTodo[1])
            } else {
                throw {
                    error: {
                        code: 404,
                        message: 'id was not found'
                    }
                }
            }

        } catch (err) {
            const errors = err.errors
            if (errors) {
                if (errors.length > 0) {
                    res.status(400).json({ error: { code: 400, message: 'invalid input' } })
                } else {
                    res.status(500).json({ errors: { code: 500, message: 'internal server error' } })
                }

            } else {
                res.status(400).json(err)
            }
        }

    }

    static async deleteTodo(req, res) {
        try {
            const targetId = req.params.id
            const deletedTodo = await Todo.destroy({ where: { id: targetId } })
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
        } catch (err) {
            const errors = err.errors
            if (errors) {
                res.status(500).json({ errors: { code: 500, message: 'internal server error' } })
            } else {
                res.status(404).json(err)
            }
        }
    }
}

module.exports = Controller