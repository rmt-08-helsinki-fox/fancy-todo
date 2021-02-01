const {Todo} = require('../models')

class Controller{
    static async addTodo(req, res){
        // console.log(req.body)
        // res.send('asdf')
        
        try{

            let {title, description, due_date} = req.body
            let newTodo = {
                title,
                description,
                due_date
            }
            let result = await Todo.create(newTodo, {
                // returning: ['id','title','description','due_date'],
            })
            // delete result.createdAt
            // delete result.updatedAt
            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt
            res.status(201).send(result)
            
        } catch(err){
            console.log(err)
            if(err.errors){
                res.status(400).send(err.errors[0].message)
            }else{
                res.status(500)
            }
            // if(err.msg){
            //     res.send(err.msg)
            // }else{
            //     res.status(500)
            // }
        }

        // Todo.create(newTodo, {
        //     returning: true
        // })
        // .then((result)=>{
        //     res.send(result)
        // })
        // .catch((err)=>{
        //     res.send(err)
        // })
        
    }

    static async read(req, res){
        try{
            let result = await Todo.findAll()
            res.status(200).send(result)
        }catch(err){
            res.status(500).send(err)
        }
    }
    static async readById(req, res){
        try{
            let result = await Todo.findByPk(req.params.id)
            if(result){
                res.status(200).send(result)
            }else{
                res.status(404).json('Error not found')
            }
        }catch(err){
            res.send(err)
        }
    }
    static async editWhole(req, res){
        let {title, description, due_date, status} = req.body
        let updateTodo = {
            title, 
            description,
            due_date,
            status
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
                res.status(404).json("Error not found")
            }
        }catch(err){
            if(err.errors){
                res.status(400).send(err.errors[0].message)
            }else{
                res.status(500)
            }
        }
    }
    static async edit(req, res){
        let {status} = req.body
        let updateTodo = {
            status
        }
        try{
            let result = await Todo.update(updateTodo, {
                where: {
                    id: req.params.id
                }
            })
            if(result[0]){
                res.status(200).send(result[1][0])
            }else{
                res.status(404).json("Error not found")
            }
        }catch(err){
            console.log(err)
            if(err.errors){
                res.status(400).send(err.errors[0].message)
            }else{
                res.status(500)
            }
        }
    }
    static async delete(req, res){
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
                res.status(404).send("Error not found")
            }
            // res.send(result)
        }catch(err){
            res.status(500)
        }
    }
}

module.exports={
    Controller
}