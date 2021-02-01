const { Todo } = require('../models');
const errorMsg  = require('../helpers/errorMsg');

class TodoController{

    static index = async(req,res) => {
        try {
            let todos = await Todo.findAll();
            res.status(200).json(todos);
        } catch (error) {
            let err = errorMsg({msg : "failed to fetch todos",statusCode:500})
            res.status(err.statusCodeRes).json(err.msg)
        }
    }
    static create = async(req,res) => {
        try {
            let {title,description,status,due_date} = req.body;
            let todo = await Todo.create({title,description,status,due_date});
            return res.status(201).json(todo);
        } catch (err) {
            let error = errorMsg(err);
            res.status(error.statusCodeRes).json(error.msg);
        }
    }
    static update = async(req,res) => {
        try {
            let {title,description,status,due_date} = req.body;
            let todo = await Todo.findByPk(+req.params.id);
            if(!todo){
                throw {msg : "Not found todo", statusCode : 404}
            }
            await todo.update({title,description,status,due_date});

            res.status(200).json(todo);
        } catch (err) {
            let error = errorMsg(err);
            res.status(error.statusCodeRes).json(error.msg);
        }
    }
    static updateStatus = async(req,res) => {
        try {
            let {status} = req.body;
            let todo = await Todo.findByPk(+req.params.id);
            if(!todo){
                throw {msg : "Not found todo", statusCode : 404}
            }
            await todo.update({status});
            res.status(200).json(todo);
        } catch (err) {
            let error = errorMsg(err);
            res.status(error.statusCodeRes).json(error.msg);
        }
    }
    static detail = async(req,res) => {
        try {
            let todo = await Todo.findByPk(+req.params.id);
            if(!todo){
                throw {msg : "Not found todo", statusCode : 404}
            }
            res.status(200).json(todo);
        } catch (err) {
            let error = errorMsg(err);
            res.status(error.statusCodeRes).json(error.msg);
        }
    }
    static destroy = async(req,res) => {
        try {
            let todo = await Todo.findByPk(+req.params.id);
            if(!todo){
                throw {msg : "Not found todo", statusCode : 404}
            }
            await todo.destroy();
            res.status(200).json({msg : "Success to delete"});
        } catch (err) {
            let error = errorMsg(err);
            res.status(error.statusCodeRes).json(error.msg);
        }
    }

}

module.exports = TodoController