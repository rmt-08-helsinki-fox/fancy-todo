const { Todo } = require('../models')

class TodoController {

    static addTodo(req, res, next) {
        const { title, description, status, due_date, } = req.body
        Todo.create({
            title, description, status, due_date, UserId: req.decoded.id
        }).then(todo => {
            res.status(201).json(todo)
        }).catch(err => {
            next(err)
        })
    }

    static getList(req, res, next) {
        Todo.findAll()
            .then(todo => {
                res.status(200).json(todo)
            }).catch(err => {
                next(err)
            })
    }

    static getData(req, res, next) {
        let id = +req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if (todo !== null) {
                    res.status(200).json(todo)
                } else {
                    throw ({name: "dataNothing" ,
                    msg: "Data Not Found" })
                }
            }).catch(err => {
               next(err)
            })
    }

    static updateData(req, res, next) {
        let id = +req.params.id
        const { title, description, status, due_date } = req.body
        Todo.update({
            title, description, status, due_date
        }, {
            where:
                { id },
            returning: true
        })
            .then(todo => {
                if(todo[0] === 1){
                    res.status(200).json(todo[1])
                }else{
                    throw ({name: "dataNothing" ,
                    msg: "Data Not Found" })
                }
            }).catch(err => {
                next(err)
            })
    }

    static updateStatus(req, res, next) {
        let id = +req.params.id
        const { status } = req.body
        Todo.update({
            status
        }, {
            where:
                { id },
            returning: true
        })
            .then(todo => {
                if(todo[0] === 1){
                    res.status(200).json(todo[1])
                }else{
                    throw ({name: "dataNothing" ,
                    msg: "Data Not Found" })
                }
            }).catch(err => {
                next()
            })
    }

    static deletedData(req, res, next) {
        let id = +req.params.id
        Todo.destroy({
            where:
                { id }
        })
            .then(todo => {
                if(todo === 1){
                    res.status(200).json({msg : "todo success to delete"})
                }else{
                    throw ({name: "dataNothing" ,
                    msg: "Data Not Found" })
                }
            }).catch(err => {
                  next()
            })
    }
    
}

module.exports = TodoController