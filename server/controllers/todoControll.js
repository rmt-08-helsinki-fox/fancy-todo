const { Todo } = require("../models/")

class TodoControll {
  static add(req, res, next){
    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.dataUser.id
    }

    if(newTodo.status === ""){
      newTodo.status = "Not Done Yet"
    }

    Todo.create(newTodo)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static findAll(req, res, next){
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err);
    })
  }

  static findById(req, res, next){
    const id = +req.params.id

    Todo.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateAll(req, res, next){
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
      next(err)
    })
  }

  static updateStatus(req, res, next){
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
      next(err)
    })
  }

  static delete(req, res, next){
    Todo.destroy({
      where: {
        id: +req.params.id
      },
      returning: true
    })
    .then(data => {
      res.status(200).json({message: "todo has been deleted"})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TodoControll