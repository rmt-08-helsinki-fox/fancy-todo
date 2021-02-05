const {TodoList} = require('../models/index.js');
const axios = require('axios');


class TodoController {
    
    static postTodo (req, res, next){
        let newTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId : req.decoded.id
        }
        TodoList.create(newTodo)
        .then(todo => {
            return axios.get('https://www.breakingbadapi.com/api/quote/random')
            .then(response => {
                res.status(200).json({todo, quotes : response.data[0]})
            })
        })
        .catch(err => {
            next(err)
            // if(err.name === 'SequelizeValidationError'){
            //     res.status(400).json(err.errors[0].message)
            // }else{
            //     console.log(err)
            //     res.status(500).json({ message : "internal server error "})
            // }
        })
    }

    static getTodo (req, res, next) {
        TodoList.findAll({where : {UserId : req.decoded.id}})
        .then(data => {
            return axios.get('https://www.breakingbadapi.com/api/quote/random')
            .then(response => {
                console.log(data)
                res.status(200).json({data : data, quotes : response.data[0]})
            })
        })
        .catch(err => {
            next(err)
            console.log(err)
            //res.status(500).json({ message : "internal server error"})
        })
    }

    static findById (req, res, next){
        let id = +req.params.id
        TodoList.findByPk(id)
        .then(data => {
            if(data === null){
                next({name : 'findById'})
                //res.status(404).json('data not found')
            }else{
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
            //res.status(500).json({ message : "internal server error"})
        })
    }

    static putTodo (req, res, next){
        const id = +req.params.id
        const UserId = req.decoded.id
        const { title, description, status, due_date,} = req.body  
        TodoList.update({title, description, status, due_date, UserId}, {where : {id}, returning : true})
        .then(data => {
            if(data[1] < 1){
                next({err})
                //res.status(404).json({"error" : "data not found"})
            }else{
                res.status(200).json(data[1][0])
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static patchTodo (req, res, next) {
        const status = req.body.status
        TodoList.findByPk(+req.params.id)
        .then(data => {
            if(data === null){
                next({err})
                //res.status(404).json({"error" : "data not found"})
            }else{
                let id = +req.params.id
                let flag 
                if(req.body.status === 'true'){
                    flag = true
                }else{
                    flag = false
                }
                data.dataValues.status = flag
                TodoList.update(data.dataValues, {where : {id : id}, returning : true})
                .then(todo =>{
                    res.status(200).json(todo[1][0])
                })
                .catch(err => {
                    next(err)
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo (req, res){
        let id = +req.params.id
        TodoList.destroy({where : {id}, returning : true})
        .then(todo => {
            // if(todo < 1){
            //     next({err})
            //     //res.status(404).json({"error" : "data not found"})
            // }else{
                // }
            res.status(200).json('data deleted succesfully')
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = TodoController;