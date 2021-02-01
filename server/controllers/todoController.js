const { Todo } = require("../models");

module.exports = class TodoController {

    static getTodos(req, res) {

    }

    static addTodo(req, res) {
        let { title, description, status, due_date } = req.body;
        Todo.create({ title, description, status, due_date }, { returning: true })
            .then(todo => res.status(201).json(todo))
            .catch(err => {
                if(err.validatorKey === "isAfter") {
                    res.status(400).json(err)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static getTodo(req, res) {

    }

    static putTodo(req, res) {

    }

    static patchTodo(req, res) {

    }

    static deleteTodo(req, res) {

    }
}