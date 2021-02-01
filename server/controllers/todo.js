const { ToDo } = require('../models/');

class Controller {
    static addTodo(req, res) {
        let { title, description, status, due_date } = req.body;
        let newtodo = { title, description, status, due_date };

        ToDo.create(newtodo)
        .then(todo => res.status(201).json(todo))
        .catch(err => {
            err.name === "SequelizeValidationError" ? res.status(400).json(err) : res.status(500).json({msg: "Internal server error"});
        });
    }
    static getTodo(req, res) {
        ToDo.findAll()
        .then(todos => res.status(200).json(todos))
        .catch(err => res.status(500).json({msg: "Internal server error"}));
    }
    static getTodoById(req, res) {
        ToDo.findByPk(req.params.id)
        .then(todo => {
            todo ? res.status(200).json(todo) : res.status(404).json({msg: 'error not found'});
        })
        .catch(err => res.status(500).json({msg: "Internal server error"}));
    }
    static editTodo(req, res) {
        let { title, description, status, due_date } = req.body;
        let editedtodo = { title, description, status, due_date };

        ToDo.update(editedtodo, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(todo => {
            todo[0] > 0 ? res.status(200).json(todo[1][0]) : res.status(404).json({msg: 'error not found'});
            
        })
        .catch(err => {
            err.name === "SequelizeValidationError" ? res.status(400).json(err) : res.status(500).json({msg: "Internal server error"});
        });
    }
    static updateTodo(req, res) {
        ToDo.update({status: req.body.status}, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(todo => {
            todo[0] > 0 ? res.status(200).json(todo[1][0]) : res.status(404).json({msg: 'error not found'});
            
        })
        .catch(err => {
            err.name === "SequelizeValidationError" ? res.status(400).json(err) : res.status(500).json({msg: "Internal server error"});
        });
    }
    static deleteTodo(req, res) {
        ToDo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(todo => {
            todo > 0 ? res.status(200).json({msg: "delete success"}) : res.status(404).json({msg: "error not found"});
        })
        .catch(err => res.status(500).json({msg: "Internal server error"}));
    }
}

module.exports = Controller;