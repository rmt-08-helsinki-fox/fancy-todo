const Todo = require('../models/index').Todo

class TodoController{
  static postNewTodo (req, res){
    //POST
    let {title, description, due_date} = req.body
    Todo.create({title, description, due_date})
    .then(todo => {
      console.log(todo)
      res.status(201).json(todo)
    }) 
    .catch(err => {
      if(err.name = 'SequelizeValidationError'){
        res.status(400).json(err.message)
      } else {
        res.status(500).json({msg : 'Internal Server Error'})
      }
    })
  }
  static getAllTodos (req, res){
    //GET
    Todo.findAll({order: [['id', 'ASC']]})
    .then(todos => {
      res.status(200).json(todos)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({msg : 'Internal Server Error'})
    })
  }
  static getTodo (req, res){
    Todo.findOne({
      where: {id : req.params.id}
    })
    .then(todo => {
      if(!todo){
        res.status(404).json({msg: 'Data Not Found'})
      }
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(500).json({msg: 'Internal Server Error'})
    })
  }
  static updateTodo (req, res){
    //PUT
    let {title, description, status, due_date} = req.body
    Todo.update(
      {title, description, status, due_date},
      {where: {id : req.params.id},
      returning: true
    })
    .then(todo => {
      let updatedTodo = todo[1][0]
      if(todo[0] == 0){
        return res.status(404).json({msg: 'data not found'})
      }
      return res.status(200).json(updatedTodo)

    })
    .catch(err => {
      if(err.name == 'SequelizeValidationError'){
        return res.status(400).json(err.message)
      }
      console.log(err)
      return res.status(500).json({msg: 'Internal Server Error'})
    })
  }
  static patchTodo (req, res){
    //PATCH
    let { status } = req.body
    Todo.update({status},
      {
        where: {id: req.params.id},
        returning: true
      })
    .then(todo => {
      let updatedTodo = todo[1][0]
      if(todo[0] == 0){
        return res.status(404).json({msg: 'data not found'})
      }
      res.status(200).json(updatedTodo)
    })
    .catch(err => {
      console.log(err.name)
      if (err.name == 'SequelizeDatabaseError'){
        return res.status(400).json(err.message)
      }
      res.status(500).json({msg: 'Internal Server Error'})
    })
  }

  // static deleteTodo (req, res){
  //   Todo.destroy({
  //     where: {id : req.params.id}
  //   })
  //   .then(todo => {
  //     console.log(todo)
  //     if(todo == 0){
  //       return res.status(404).json({msg: 'Error Data Not Found'})
  //     }
  //     res.status(200).json({msg: 'Delete Successful'})
  //   })
  //   .catch(err => {
  //     res.status(500).json({msg: 'Internal Server Error'})
  //   })
  // }
  
  static async deleteTodo(req, res){
    //DELETE
    try {
      let todo = await Todo.findAll({
        where: {id : req.params.id}
      })
      if(todo.length == 0){
        res.status(404).json({msg: 'data not found'})
      }
      await Todo.destroy({
        where: {id : req.params.id}
      })
      res.status(200).json({todo, message: 'Delete Successful'})
    } catch (err) {
      res.status(500).json({msg: 'Internal Server Error'})
    }
  }
}

module.exports = TodoController