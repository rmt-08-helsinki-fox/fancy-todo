const { TODO } = require('../models/')

class todoController {
  static add(req, res){
    let newtask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    TODO.create(newtask)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }
  // static addTodo(req, res) {
  //   let {title, description, status, due_date} = req.body
  //   let newtask = {title, description, status, due_date}

  //   TODO.create(newtask, {returning: true})
  //   console.log(newtask, "THIS IS THE TASK")
  //   .then(todo => {
  //     console.log('<<<<< INI DI THEN')
  //     res.status(201).json(todo)
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       msg: "Internal Server Error"
  //     })
  //   })
  // }
  static getTodo(req, res) {
    TODO.findAll()
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(500).json({
        msg: "Internal Server Error"
      })
    })
  }
  static findTodo(req, res) {
    TODO.findByPk(req.params.id)
    .then(todo => {
      if(!todo) {
        res.status(404).json({
          msg: 'Todo tidak ditemukan'
        })
      } else {
        res.status(200).json(todo)
      }
    })
    .catch(err => {
      res,status(500).json({msg: "Error Not Found"})
    })
  }
  static editTodos(req, res) {
    let editTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    TODO.update(editTodo, {
      where: {id: +req.params.id}
    })
    .then(todo => {
      if(!editTodo) {
        res.status(404).json({msg: "Todo Not found"})
      } else {
        res.status(200).json(editTodo)
      }
    })
    .catch(err => {
      res.status(500).json({msg: "Internal Server Error"})
    })
  }
  static updateStatus(req, res) {
    TODO.update({status: req.bosy.status}, {
      where: {
        id: +req.params.id
      }
    })
    .then(todo => {
      if(!todo) {
        res.status(404).json({msg: "Todo Status not found"})
      } else {
        res.status(200).json(todo)
      }
    })
    .catch(err => {
      if(err.name === "SequelizeValidationError") {
        res.status(400).json(err.message)
      } else {
        res.status(500).json({msg: "Internal Server Error"})
      }
    })
  }
  static deleteTodo(req, res) {
    TODO.destroy({where:{id: +req.params.id}})
    .then(todo => {
      if(!todo) {
        res.status(404).json({msg: "Error not found"})
      } else {
        res,status(200).json({msg: "Todo Success to Delete"})
      }
    })
    .catch(err =>{
      res.status(500).json({msg: "Internal Server Error"})
    })
  }
}

module.exports = todoController
