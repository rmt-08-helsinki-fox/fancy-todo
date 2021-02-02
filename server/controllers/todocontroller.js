const {Todo, User} = require("../models/")
const axios = require("axios").default

class TodoController {
    static create(req , res) {
        let input = {
            title : req.body.title,
            description : req.body.description,
            status : false,
            due_date : req.body.due_date,
            UserId : req.decoded.id
        }
        Todo.create(input)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readAllTodos(req, res) {
        Todo.findAll({
            where: {
                UserId : req.decoded.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static todoFindById(req, res) {
        Todo.findOne({
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    msg : "Invalid Id"
                })
            }
    
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }

    static updateTodo(req, res) {
        const {title, description, status, due_date} = req.body
        const todoData = {title, description, status, due_date}
        Todo.update(todoData, {
            where: {
                id : +req.params.id
            },
            returning : true
        })
        .then(data => {
            if (data[0] !== 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    msg : "Invalid ID"
                })
            }
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateStatusTodo(req, res) {
        let input = {
            title,
            description ,
            status : true,
            due_date,
            UserId
        }
        Todo.update(input, {
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            if (data[0] !== 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    msg : "Invalid ID"
                })
            }
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTodo(req, res) {
        Todo.destroy({
            where :{
                id : +req.params.id
            }
        })
        .then(data => {
            if (data > 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    msg: "Invalid Id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }

    static getWeather(req, res, next) {
        axios.get("api.openweathermap.org/data/2.5/weather?q=tangerang&appid=538ef4d63afd919c0b6c68dc287a89d3")
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController

