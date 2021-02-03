const { Todo, Food } = require('../models');
const axios = require('../helpers/axios');

class TodoController{

    static index = async(req,res,next) => {
        try {
            let todos = await Todo.findAll({ where : { UserId : +req.user.id }, include : 'Food' });
            res.status(200).json(todos);
        } catch (err) {
            next(err)
        }
    }
    static create = async(req,res,next) => {
        try {
            let {title,description,status,due_date} = req.body;
            let todo = await Todo.create({title,description,status,due_date, UserId : req.user.id});
            let foodReq = await axios.get('/recipes/random');
            let food = foodReq.data.recipes[0];
            await Food.create({foodName : food.title, description : food.summary, instruction : food.instructions, TodoId : todo.id})
            let recipe = await todo.getFood();
            todo.setDataValue('Food',recipe)
            return res.status(201).json(todo);
        } catch (err) {
            next(err)
        }
    }
    static update = async(req,res,next) => {
        try {
            let {title,description,status,due_date} = req.body;
            let todo = await Todo.update({title,description,status,due_date},{ where : {id : +req.params.id}, returning : true, individualHooks : true});
            res.status(200).json(todo[1][0]);
        } catch (err) {
            next(err)
        }
    }
    static updateStatus = async(req,res,next) => {
        try {
            let {status} = req.body;
            let todo = await Todo.update({status},{ where : {id : +req.params.id}, returning : true, individualHooks : true});
            res.status(200).json(todo[1][0]);
        } catch (err) {
            next(err)
        }
    }
    static detail = async(req,res,next) => {
        try {
            let todo = await Todo.findByPk(+req.params.id,{ include : 'Food' });
            res.status(200).json(todo);
        } catch (err) {
            next(err)
        }
    }
    static destroy = async(req,res,next) => {
        try {
            await Todo.destroy({ where : { id : +req.params.id} });
            res.status(200).json({msg : "Success to delete"});
        } catch (err) {
            next(err)
        }
    }

}

module.exports = TodoController