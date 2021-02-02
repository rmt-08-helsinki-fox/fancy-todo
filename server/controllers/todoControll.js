const { Todo } = require("../models/")

class TodoControll {
  static add(req, res){
    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.datauser.id
    }

    if(newTodo.status === ""){
      newTodo.status = "Not Done Yet"
    }

    Todo.create(newTodo)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      let error = err.errors[0].message
      res.status(400).json({error})
    })
  }

  static findAll(req, res){
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static findById(req, res){
    const id = +req.params.id

    Todo.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }

  static updateAll(req, res){
    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(newTodo, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
    .then(data => {
      res.status(200).json(data[1][0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static updateStatus(req, res){
    let newTodo = {
      status: req.body.status
    }

    Todo.update(newTodo, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
    .then(data => {
      res.status(200).json(data[1][0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static delete(req, res){
    Todo.destroy({
      where: {
        id: +req.params.id
      },
      returning: true
    })
    .then(data => {
      if(data === 0) throw ({msg: "Todo Not Found"})
      res.status(200).json({message: "todo has been deleted"})
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = TodoControll