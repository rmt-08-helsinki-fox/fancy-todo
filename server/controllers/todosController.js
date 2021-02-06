const { Todo, User } = require('../models')
const axios = require('axios')

class Controller {
    static async add(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            
            const newTodo = await Todo.create({
                title, description, status, due_date, UserId: req.currentUser.id
            })
            
            res.status(201).json(newTodo)
        } catch (error) {
            next(error)
        }
    }

    static async getTodos(req, res, next) {
        try {
            const todos = await Todo.findAll({
                include: User,
                order: [['id', 'ASC']]
            })

            // console.log(todos[0].User);
            res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async getTodo(req, res, next) {
        try {
            const todoId = +req.params.id
            const todo = await Todo.findByPk(todoId)
            if (todo) {
                res.status(200).json(todo)
                
            } else {
                throw {
                    name: 'Custom error',
                    error: {
                        code: 404,
                        messages: ['id was not found']
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async putTodo(req, res, next) {
        try {
            
            const todoId = +req.params.id
            const { title, description, status, due_date } = req.body
            console.log(todoId, req.body, 'sdlfjlksdjflkaj');
            const updatedTodo = await Todo.update({ title, description, status, due_date }, { where: { id: todoId }, returning: true })
            if (updatedTodo[0]) {
                res.status(200).json(updatedTodo[1])
            } else {
                throw {
                    name: 'Custom error',
                    error: {
                        code: 404,
                        messages: ['id was not found']
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async patchTodo(req, res, next) {
        try {
            const todoId = +req.params.id
            let updatedTodo = {}
            const { status } = req.body
            

            updatedTodo = await Todo.update({ status }, { where: { id: todoId }, returning: true })

            if (updatedTodo[0]) {
                res.status(200).json(updatedTodo[1])
            } else {
                throw {
                    name: 'Custom error',
                    error: {
                        code: 404,
                        messages: ['id was not found']
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            const todoId = req.params.id
            const deletedTodo = await Todo.destroy({ where: { id: todoId } })
            if (deletedTodo) {
                res.status(200).json({ message: 'a todo was deleted' })
            } else {
                throw {
                    name: 'Custom error',
                    error: {
                        code: 404,
                        messages: ['id was not found']
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async getHeadLineNews(req, res, next){
        try {
            const country = req.query.country || 'id'
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&${process.env.NEWS_API_KEY}`)
            res.status(200).json(response.data)
        } catch (error){
            next(error)
        }
    }
}

module.exports = Controller