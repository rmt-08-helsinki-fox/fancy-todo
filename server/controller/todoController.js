const { Todo } = require('../models');

class TodoController {
    static addTodo(req, res) {
        const { title, description, status, due_date } = req.body;
        const newTodo = { title, description, status, due_date, user_id: req.decoded.id };
        Todo
            .create(newTodo)
            .then(todo => {
                const msg = {
                    message: 'Success',
                    data: todo,
                    response: true
                }
                res.status(201).json(msg);
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    const validates = err.errors.map(e => e.message);
                    const msg = {
                        message: validates,
                        response: false
                    }
                    res.status(400).json(msg);
                } else {
                    res.status(500).json(err);
                };
            });
    }
    static async showAllTodos(req, res) {
        try {
            const opt = {
                where: {
                    user_id: req.decoded.id
                },
                order: [['due_date', 'ASC']]
            }
            const todos = await Todo.findAll(opt);
            const msg = {
                message: 'Success',
                data: todos,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            const msg = {
                message: err,
                response: false
            }
            res.status(500).json(msg);
        }
    }
    static async showTodo(req, res) {
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
                throw 'Data not found';
            }
            const msg = {
                message: 'Success',
                data: todo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            const msg = {
                message: err,
                response: false
            }
            if (err === 'Data not found') {
                res.status(404).json(msg);
            } else {
                res.status(500).json(msg)
            };
        }
    }
    static async updateTodo(req, res) {
        try {
            const id = req.params.id;
            const { title, description, status, due_date } = req.body;
            const dataUpdate = { title, description, status, due_date };
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                },
                returning: true
            }
            const findTodo = await Todo.findOne(opt);
            if (!findTodo) {
                throw '404';
            }

            const todo = await Todo.update(dataUpdate, opt);
            const msg = {
                message: 'Success',
                data: todo[1][0],
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                const validates = err.errors.map(e => e.message);
                const msg = {
                    message: validates,
                    response: false
                }
                res.status(400).json(msg);
            } else if (err === '404') {
                const msg = {
                    message: 'Data not found',
                    response: false
                }
                res.status(404).json(msg)
            } else {
                res.status(500).json(err);
            };
        }
    }
    static async updateStatus(req, res) {
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
            const findTodo = await Todo.findOne(opt);
            if (!findTodo) throw '404';

            const todo = await Todo.update({ status }, opt);
            const msg = {
                message: 'Success',
                data: todo[1][0],
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                const validate = err.errors[0].message;
                const msg = {
                    message: validate,
                    response: false
                }
                res.status(400).json(msg);
            } else if (err === '404') {
                const msg = {
                    message: 'Data not found',
                    response: false
                }
                res.status(404).json(msg)
            } else {
                res.status(500).json(err);
            };
        }
    }
    static async destroy(req, res) {
        try {
            const id = req.params.id;
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                }
            }
            const findTodo = await Todo.findOne(opt);
            if (!findTodo) throw '404';
            const todoDelete = await Todo.destroy(opt);
            const msg = {
                message: 'Success',
                data: findTodo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            if (err === '404') {
                const msg = {
                    message: 'Data not found',
                    response: false
                }
                res.status(404).json(msg);
            } else {
                res.status(500).json(err);
            }
        }
    }
}

module.exports = TodoController;