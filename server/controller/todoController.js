const { Todo } = require('../models');
const axios = require('axios');

class TodoController {
    static async addTodo(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body;
            const newTodo = { title, description, status, due_date, user_id: req.decoded.id };
            const insertTodo = await Todo.create(newTodo);

            // Shot api quotes
            const getQuotes = await axios({
                method: 'get',
                url: 'https://andruxnet-random-famous-quotes.p.rapidapi.com?cat=famous',
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST
                },
            });


            const quotes = `${getQuotes.data[0].quote} --${getQuotes.data[0].author}`;
            const data = {
                todo: insertTodo,
                quotes
            }
            const msg = {
                message: 'Success',
                data,
                response: true
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async showAllTodos(req, res, next) {
        try {
            const opt = {
                where: {
                    user_id: req.decoded.id
                },
                order: [['due_date', 'ASC']]
            }
            const todos = await Todo.findAll(opt);
            if (todos.length === 0) throw 404;
            const msg = {
                message: 'Success',
                data: todos,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async showTodo(req, res, next) {
        try {
            const id = req.params.id;
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                }
            }
            const todo = await Todo.findOne(opt);
            if (!todo) {
                throw 404;
            }
            const msg = {
                message: 'Success',
                data: todo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async updateTodo(req, res, next) {
        try {
            const id = req.params.id;
            const { title, description, due_date } = req.body;
            const dataUpdate = { title, description, due_date };
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                },
                returning: true
            }

            const todo = await Todo.update(dataUpdate, opt);
            if (todo[1].length === 0) throw 404;
            const msg = {
                message: 'Success',
                data: todo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const id = req.params.id;
            const { status } = req.body;

            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                },
                returning: true
            }

            const todo = await Todo.update({ status }, opt);
            if (todo[1].length === 0) throw 404;
            const msg = {
                message: 'Success',
                data: todo[1][0],
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async destroy(req, res, next) {
        try {
            const id = req.params.id;
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                }
            }
            const todo = await Todo.destroy(opt);
            if (todo === 0) throw 404;
            const msg = {
                message: 'Success',
                data: todo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TodoController;