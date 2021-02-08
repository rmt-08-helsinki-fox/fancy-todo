const { Todo } = require('../models')
// const axios = require('axios')

class TodoController {
    static createTodo(req,res, next) {
        let {title, description, status, due_date} = req.body
        let dataTodo = {title, description, status, due_date, UserId : +req.data.id}
        Todo.create(dataTodo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err=> {
                if(err.name ==="SequelizeValidationError"){
                    res.status(400).json(err.errors[0].message)
                } else {
                    res.status(500).json({message: "Invalid request"})
                }
                // next(err)
            })
    }
    static getTodo(req,res, next) {
        Todo.findAll({where: {UserId : req.data.id}})
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err=> {
                res.status(500).json({message: "Invalid request"})
                // next(err)
            })
    }
    static findOneTodo(req,res, next) {
        // console.log(req.params.id)
        const id = +req.params.id
        Todo.findOne({
            where: {
                id: id
            }
        })
            .then(data => {
                if(data === null) {
                    res.status(404).json({message:"Invalid Data"})
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err=> {
                res.status(500).json({message: "Invalid request"})
                // next(err)
            })
    }
    static editTodo(req,res, next) {
        console.log(req)
        const id = +req.params.id
        const userId = +req.data.id
        const {title, description, status, due_date} = req.body
        const dataTodo = {title, description, status, due_date, UserId: userId}
        Todo.update(dataTodo, {
            where: {
                id : id
            },
            returning:true
        })
            .then(data => {
                if(data[0] === 0){
                    res.status(404).json({message: "Invalid Data"})
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                res.status(500).json({message: "Invalid request"})
                // next(err)
            })
    }
    static editStatusTodo(req,res, next) {
        const id = +req.params.id
        const userId = +req.data.id
        const {status} = req.body
        const dataTodo = {status, UserId : userId}

        Todo.update(dataTodo, {
            where: {
                id : id
            },
            returning: true
        })
            .then(data => {
                // console.log(data[1][0])
                if(data[0] === 0){
                    throw { name: 'custom', msg:'Invalid Data' }
                    res.status(404).json({message:"Invalid Data"})
                } else {
                    let {id, title, description, due_date, status, createdAt, updatedAt, UserId} = data[1][0]
                    let dataOutput = {id,title, description, due_date, status, createdAt, updatedAt, UserId}
                    res.status(200).json(dataOutput)
                }
            })
            .catch(err => {
                if(err.name === "SequelizeValidationError") {
                    res.status(400).json(err.errors[0].message)
                } else {
                    res.status(500).json({message: "Invalid request"})
                }
                // next(err)
            })
    }
    static deleteTodo(req,res, next) {
        const id = +req.params.id
        Todo.destroy({
            where: {
                id: id
            },
            returning: true
        })
            .then(data => {

                if(data === 0) {
                    res.status(404).json({message: "Invalid Data"})
                    throw {message: "invalid data", status: 400}
                } else {
                    res.status(200).json({message : "todo success to delete"})
                }
            })
            .catch(err => {
                res.status(500).json({message: "Invalid request"})
                next(err)
            })
    }
    // static getWeather (req,res, next) {

    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${process.env.API_KEY}`)
    //         .then(response => {
    //             console.log(`masuk inii`)
    //             let {description, icon} =  response.data.weather[0]
    //             let temperature = Math.floor(response.data.main.temp - 273)
    //             let data = { description, icon, temperature}
    //             res.status(200).json(data)

    //         })
    //         .catch(err => {
    //             console.log(`gagalll`)
    //             // console.log(err)
    //             res.status(500).json({message: "Invalid request"})
    //             // next(err)
    //         })
    // }
    static findOne (req,res, next) {
        let id = +req.params.id
        Todo.findOne({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: "Invalid request"})
                // next(err)
            })
    }
 
}


module.exports = TodoController