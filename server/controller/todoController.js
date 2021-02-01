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
                    const msg = {
                        message: err.errors[0].message,
                        response: false
                    }
                    res.status(400).json(msg);
                } else {
                    res.status(500).json(err);
                };
            });
    }
}

module.exports = TodoController;