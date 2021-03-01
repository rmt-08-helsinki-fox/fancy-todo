const { ToDo } = require('../models/');
const axios = require('axios');

class Controller {
    static addTodo(req, res, next) {
        let { title, description, status, due_date } = req.body;
        let newtodo = { 
            title, 
            description, 
            status, 
            due_date,
            user_id: req.decoded.id
        };

        ToDo.create(newtodo)
        .then(todo => res.status(201).json({todo}))
        .catch(err => next(err));
    }
    static getTodo(req, res, next) {
        ToDo.findAll({
            where: {
                user_id: req.decoded.id
            },
            order: [["due_date", "DESC"]]
        })
        .then(todos => {
            // todos.forEach(todo => todo.due_date = todo.due_date.getUTCDate());//todo.due_date.toLocaleDateString());
            // console.log(todos);
            res.status(200).json({todos});
        })
        .catch(err => next(err));
    }
    static getTodoById(req, res, next) {
        res.status(200).json({ todo: req.todo });
    }
    static editTodo(req, res, next) {
        let { title, description, status, due_date } = req.body;
        let editedTodo = { title, description, status, due_date };

        if(!title || !description || !due_date) throw ({name: "customErr", status: 400, msg: "title, status and due_date cannot be empty"});
        ToDo.update(editedTodo, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(todo => {
            console.log(todo);
            res.status(200).json({todo: todo[1][0]});
        })
        .catch(err => next(err));
    }
    static updateTodo(req, res, next) {
        ToDo.update({status: req.body.status}, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(todo => {
            res.status(200).json({todo: todo[1][0]});
        })
        .catch(err => next(err));
    }
    static deleteTodo(req, res) {
        let deletedtodo = req.todo;

        ToDo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json({ deletedtodo });
        })
        .catch(err => next(err));
    }
    static getNewsById(req, res, next) {
        axios.get(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${req.todo.title}&api-key=${process.env.NYTAPI}`
        ).then(({ data }) => {
            data = data.response.docs;
            let { headline, abstract, web_url } = data[Math.floor(Math.random()*data.length)];
            let news = {
                title: headline.main,
                abstract,
                web_url
            }
            
            res.status(200).json({ news });
        })
        .catch(err => {
            next(err);
        });
        
    }
}

module.exports = Controller;