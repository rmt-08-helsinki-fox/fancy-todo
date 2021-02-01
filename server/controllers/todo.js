const {Todo} = require('../models')


class TodoController {

    static create(req, res) {
        const {title, description, status, due_date} = req.body;
        const newTodo = {title, description, status, due_date};

        Todo.create(newTodo)
        .then((todo) => {
            res.status(201).json(todo)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }

    static list(req, res) {
        Todo.findAll()
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static todoById(req, res) {
        const id = +req.params.id

        Todo.findByPk(id)
        .then((todo) => {
            if (todo) {
                res.status(200).json(todo)
            } else {
                res.status(404).json({error: 'error not found'})
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static updatePut(req, res) {
        const id = +req.params.id;
        const {title, description, status, due_date} = req.body;
        const input = {title, description, status, due_date}

        Todo.update(input, {
            where: {
                id
            },
            returning: true
        })
        .then((todo) => {
            if (todo[0] > 0) {
                res.status(200).json(todo[1][0])
            } else {
                res.status(404).json({error: 'error not found'})
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static updatePatch(req, res) {
        const id = +req.params.id;
        const status = req.body.status;
        const input = {status}

        console.log(id);

        Todo.update(input, {
            where: {
                id
            },
            returning: true
        })
        .then((todo) => {
            if (todo[0] > 0) {
                res.status(200).json(todo[1][0])
            } else {
                res.status(404).json({error: 'error not found'})
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        const id = +req.params.id

        Todo.destroy({
            where: {
                id
            }
        })
        .then((todo) => {
            console.log(todo);
            if (todo) {
                res.status(200).json({message: 'todo success to delete'})
            } else {
                res.status(404).json({error: 'error not found'})
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }
}


module.exports = TodoController;