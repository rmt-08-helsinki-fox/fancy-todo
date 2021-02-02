const { Todo } = require('../models')

class TodoController{
 static getTodos(req, res){
  Todo.findAll()
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
 }

 static addTodos(req, res){
  console.log(req.body);
  const { title, description, status, due_date } = req.body

  Todo.create({ title, description, status, due_date })
  .then(data => res.status(201).json(data))
  .catch(err => {
    if (err.name === 'SequelizeValidationError'){
      const errors = err.errors.map(e => e.message)
      res.status(400).json(errors)
    } else {
      res.status(500).json(err)
    }
  })
 }

 static getTodosId(req, res){
  const id = +req.params.id
   
  Todo.findByPk(id)
  .then(data => {
    if (data === null){
      res.status(404).json("error not found")
    } else {
    res.status(200).json(data)
    }
  })
  .catch(err => res.status(500).json(err))
 }

 static updateTodos(req, res){
  const id = +req.params.id
  const { title, description, status, due_date } = req.body

  Todo.update({ title, description, status, due_date }, {
    where: { id },
    returning: true
  })
  .then(data => {
    if (data[0] === 0){
      res.status(404).json("error not found")
    } else {
    res.status(200).json(data)
    }
  })
  .catch(err => {
    if (err.name === 'SequelizeValidationError'){
      const errors = err.errors.map(e => e.message)
      res.status(400).json(errors)
    } else {
      res.status(500).json(err)
    }
  })
 }

 static updateStatus(req, res){
  const id = +req.params.id
  const { status } = req.body

  Todo.update({ status }, {
    where: { id },
    returning: true
  })
  .then(data => {
    if (data[0] === 0){
      res.status(404).json("error not found")
    } else {
      let result = data[1][0].dataValues
      res.status(200).json(result)
    }
  })
  .catch(err => {
    if (err.name === 'SequelizeValidationError'){
      const errors = err.errors.map(e => e.message)
      res.status(400).json(errors)
    } else {
      res.status(500).json(err)
    }
  })
 }

 static deleteStatus(req, res){
  const id = +req.params.id
   
  Todo.destroy({
    where: {
      id
    }
  })
  .then(data => {
    if (!data){
      res.status(404).json("error not found")
    } else {
      console.log(data);
    res.status(200).json(`todo success to delete`)
    }
  })
  .catch(err => res.status(500).json(err))
 }
}

module.exports = TodoController