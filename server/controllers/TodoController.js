const Todo = require('../models/index').Todo

class TodoController{
  static postNewTodo (req, res, next){
    //POST
    let {title, description, due_date} = req.body
    let user_id = req.user.id
    Todo.create({title, description, due_date, user_id})
    .then(todo => {
      res.status(201).json(todo)
    }) 
    .catch(err => {
      if(err.name == 'SequelizeValidationError'){
        next(err)
      } else {
        next(err)
      }
    })
  }
  static getAllTodos (req, res, next){
    //GET
    Todo.findAll({order: [['id', 'ASC']]})
    .then(todos => {
      res.status(200).json(todos)
    })
    .catch(err => {
      next(err)
    })
  }
  static getTodo (req, res, next){
    Todo.findOne({
      where: {id : req.params.id}
    })
    .then(todo => {
      // if(!todo){
      //   console.log('tes')
      //   return res.status(404).json({msg: 'Data Not Found'})
      //   // throw({
      //   //   name: 'DataNotFound',
      //   //   status: 404,
      //   //   msg: 'Data Not Found'
      //   // })
      // }
      res.status(200).json(todo)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({msg: 'Internal Server Error'})
    })
  }
  static updateTodo (req, res, next){
    //PUT
    let {title, description, status, due_date} = req.body
    Todo.update(
      {title, description, status, due_date}, {
      where: {id : req.params.id},
      returning: true
    })
    .then(todo => {
      let updatedTodo = todo[1][0]
      // if(todo[0] == 0){
      //   console.log('ini dalem updateTodo')
      //   return res.status(404).json({msg: 'data not found'})
      // }
      return res.status(200).json(updatedTodo)

    })
    .catch(err => {
      // if(err.name == 'SequelizeValidationError'){
      //   return res.status(400).json(err.message)
      // }
      // console.log(err)
      // return res.status(500).json({msg: 'Internal Server Error'})
      next(err)
    })
  }
  static patchTodo (req, res, next){
    //PATCH
    let { status } = req.body
    // if (status !== true || status !== false){

    // }
    Todo.update({status},
      {
        where: {id: req.params.id},
        returning: true
      })
    .then(todo => {
      let updatedTodo = todo[1][0]
      console.log(updatedTodo)
      // if(todo[0] == 0){
      //   return res.status(404).json({msg: 'data not found'})
      // }
      res.status(200).json(updatedTodo)
    })
    .catch(err => {
      // console.log(err.name)
      // if (err.name == 'SequelizeDatabaseError'){
      //   return res.status(400).json(err.message)
      // }
      // res.status(500).json({msg: 'Internal Server Error'})
      next(err)
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
  
  static async deleteTodo(req, res, next){
    //DELETE
    try {
      let todo = await Todo.findAll({
        where: {id : req.params.id}
      })
      // if(todo.length == 0){
      //   res.status(404).json({msg: 'data not found'})
      // }
      await Todo.destroy({
        where: {id : req.params.id}
      })
      res.status(200).json({todo, message: 'Delete Successful'})
    } catch (err) {
      // res.status(500).json({msg: 'Internal Server Error'})
      next()
    }
  }
}

module.exports = TodoController