const e = require('express');
const { Todo }= require('../models/index.js');

class TodoController {

  static postTodos (req, res) {
    let { title, description, status, due_date } = req.body;
    Todo.create({title,description,status, due_date, UserId: 1}) //harus diganti nanti
    .then((data)=> {
      res.status(201).json(data);
    })
    .catch((err)=> {
      console.log(err)
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors)
      } else {
        res.status(500).json({ message: 'internal server error' });
      }
    })
  }

  static getTodos (req, res) {
    Todo.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err)
      const message = err || 'Internal server error';
        res.status(500).json({ message })
    })
  }

  static getTodoById (req, res) {
    let todoId = +req.params.id;

    Todo.findByPk(todoId)
    .then(data => {
      if (!data) {
        throw { msg: 'error not found' }
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    })
  }

  static putTodoById (req, res) {
    let todoId = +req.params.id;
    let { title, description, status, due_date } = req.body;

    Todo.update({ title, description, status, due_date }, {
      where: { id: todoId },
      returning: true
    })
    .then(data => {
      if (!data[0]) {
        throw { msg: 'error not found' } 
      } else {
        console.log(data);
        res.status(200).json(data[1][0]);
      }
    })
    .catch(err => {
      console.log(err);
      if(err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors)
      } else if (err.msg) {
        res.status(404).json(err);
      } else {
        res.status(500).json({message: 'internal server error'});
      }
    })
  }

  static patchTodoById (req, res) {
    let todoId = +req.params.id;
    let status = req.body.status;
    Todo.update({status},{
      where: { id: todoId },
      returning: true
    })
    .then(data => {
      if (!data[0]) {
        throw { msg: 'error not found' } 
      } else {
      res.status(200).json(data[1][0]);
      }
    })
    .catch(err=> {
      console.log(err);
      if(err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors)
      } else if (err.msg){
        res.status(404).json(err);
      } else {
        res.status(500).json({error: 'internal server error'});
      }
    })
  }

  static delTodoById (req, res) {
    let todoId = +req.params.id;
    Todo.destroy({
      where: { id: todoId }
    })
    .then((data) => {
      console.log(data);
      if (!data){ // if id not found data value is 0
        throw { msg: 'error not found' } 
      } else {
        res.status(200).json({message: 'todo success to delete'})
      }
    })
    .catch(err => {
      if (err.msg) {
        res.status(404).json(err);
      } else {
        res.status(500).json({error: 'internal server error'});
      }
    })
  }
}

module.exports=TodoController;