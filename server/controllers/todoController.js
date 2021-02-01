const {todo} = require('../models/')


class TodoController {
    static add(req, res){
        todo.create(req.body)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            if(err.name === 'SequelizeDatabaseError') res.status(500).json(err)
            else res.status(400).json(err.errors[0].message)
            
        })
    }
    
    static showList(req, res){
        todo.findAll()
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        });
    }

    static showById(req, res){
        todo.findOne({
            where:{
                id:+req.params.id
            }
        })
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(404).json(err)
        });
    }

    static edit(req, res){
        const {title, descriiption, status, due_date} = req.body

        todo.update({title, descriiption, status, due_date}, {where:{id:+req.params.id}})
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(404).json(err)
        });
    }

    static editRow(req, res){
        todo.findOne({
            where:{
                id:+req.params.id
            }
        })
        .then((data) => {
            data.status = req.body.status
            return data.save()
        })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
        
    }

    static delete(req, res){
        todo.destroy({where:{id:+req.params.id}})
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        });
    }
}

module.exports = TodoController