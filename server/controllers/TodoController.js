const {Todo} = require('../models')

class TodoController{
    static async addTodo(req, res, next){
        try{
            let {title, description, due_date} = req.body
            let UserId = req.userData.id
            let newTodo = {
                title,
                description,
                due_date,
                UserId
            }
            let result = await Todo.create(newTodo)
            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt
            res.status(201).send(result)
            
        } catch(err){
            next(err)
        }
        
    }

    static async read(req, res, next){
        try{
            let result = await Todo.findAll({
                where: {
                    UserId: req.userData.id
                }
            })
            res.status(200).send(result)
        }catch(err){
            next(err)
            // res.status(500).send(err)
        }
    }
    static async readById(req, res, next){
        try{
            let result = await Todo.findByPk(req.params.id)
            if(result){
                res.status(200).send(result)
            }else{
                next({name: 'TODO_NOT_FOUND'})
            }
        }catch(err){
            next(err)
        }
    }
    static async editWhole(req, res, next){
        let {title, description, due_date} = req.body
        let updateTodo = {
            title, 
            description,
            due_date
        }
        try{
            let result = await Todo.update(updateTodo, {
                where:{
                    id: req.params.id
                },
                returning: true
            })
            if(result[0]){
                res.status(200).send(result[1][0])
            }else{
                next({name: 'TODO_NOT_FOUND'})
            }
        }catch(err){
            next(err)
        }
    }
    static async edit(req, res, next){
        let {status} = req.body
        let updateTodo = {
            status
        }
        try{
            let result = await Todo.update(updateTodo, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            if(result[0]){
                res.status(200).send(result[1][0])
            }else{
                next({name: 'TODO_NOT_FOUND'})
            }
        }catch(err){
            next(err)
        }
    }
    static async delete(req, res, next){
        console.log(req.params.id)
        try{
            const result = await Todo.destroy({
                where: {
                    id: req.params.id
                }
            })
            if(result){
                res.send('Delete berhasil')
            }else{
                next({name: 'TODO_NOT_FOUND'})
            }
        }catch(err){
            next(err)
        }
    }
}

module.exports={
    TodoController
}