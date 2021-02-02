const {todo, User} = require('../models/')


class TodoController {
    static add(req, res){
        const {title, description, status, due_date} = req.body
        const data = {
            title,
            description,
            status,
            due_date,
            UserId : req.decode.id
        }
        todo.create(data)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            if(err.name === 'SequelizeDatabaseError') res.status(500).json(err)
            else res.status(400).json({error:err.errors[0].message})
        })
    }
    
    static showList(req, res){
        User.findOne({
            where:{
                id:req.decode.id
            },
            include: todo
        })
        .then((data) => {

            res.status(200).json(data.todos)
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
            if(!data) throw {msg: 'data not found'}
            res.status(200).json(data)
        }).catch((err) => {
            if(err.msg) res.status(404).json({message: err.msg})
            else res.status(500).json({message: 'Internal server error'})
        });
    }

    static edit(req, res){
        const {title, descriiption, status, due_date} = req.body

        console.log(req.params.id);

        todo.findOne({where:{id:+req.params.id}})
        .then((data) => {
            if(!data) throw {msg:'data not found'}
            console.log(data);
            return todo.update({title, descriiption, status, due_date}, {where:{id:+req.params.id}})
            
        })
        .then((data) => {
            console.log(data);
            res.status(200).json({ message:'Successfully update Todos'})
        }).catch((err) => {
            if (err.msg){
                res.status(404).json({error: err.msg})
            }else{
                res.status(400).json({error: err.errors[0].message})
            }            
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
            console.log(data);
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