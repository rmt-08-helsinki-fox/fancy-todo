const { Todo } = require('../models');

class TodoController {
    static addTodo(req, res) {
        const { title, description, status, due_date } = req.body;
        const newTodo = { title, description, status, due_date };
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
            const todo = await Todo.findByPk(id);
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
                    id
                },
                returning: true
            }
            const findTodo = await Todo.findByPk(id);
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
}

module.exports = TodoController;