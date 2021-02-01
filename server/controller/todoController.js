const { Todo } = require('../models');

class TodoController {
    static addTodo(req, res) {
        const { title, description, status, due_date } = req.body;
        const newTodo = { title, description, status, due_date };
        Todo
            .create(newTodo)
            .then(todo => {
                const msg = {
                    data: todo,
                    response: true
                }
                res.status(201).json(msg);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
}

module.exports = TodoController;