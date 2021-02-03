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
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static todoFindById(req, res, next) {
        Todo.findAll({
            where: {
                id : +req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
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
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=tangerang&appid=538ef4d63afd919c0b6c68dc287a89d3")
        .then(response => {
            let mainWeather
            let weatherDesc
            for (let i = 0; i < response.data.weather.length; i++) {
                mainWeather = response.data.weather[i].main
                weatherDesc = response.data.weather[i].description
            }
            res.status(200).json({mainWeather, weatherDesc})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController

