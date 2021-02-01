const {Todo} = require('../models')

class Controller {
    static listTodo(req, res){
        Todo.findAll()
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodo(req, res){
        let {title, description, due_date} = req.body
        Todo.create({title, description, due_date})
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            if(err.errors[0].path === 'due_date'){
                res.status(400).json(err)
            }else{
                res.status(500).json(err)
            }
        })
    }

    static getById(req, res){
        let id = +req.params.id
        Todo.findByPk(id)
        .then(todo => {
            if(todo === null){
                res.status(404).json({Message: 'Data Is Not Found'})
            }else{
                res.status(200).json(todo)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}


module.exports = Controller