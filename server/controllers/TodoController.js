const { Todo } = require('../models')

class TodoController{
 static getTodos(req, res, next){
  Todo.findAll({
    where: { UserId: req.user.id },
    order: [['id', 'ASC']],
    attributes: {
        // include: ['id', 'title', 'description', 'status', 'due_date'],
        exclude: ['createdAt', 'updatedAt']
    }
})
  .then(data => res.status(200).json({ message: data }))
  .catch(err => next(err))
 }

 static addTodos(req, res, next){
  const { title, description, status, due_date } = req.body

  Todo.create({ title, description, status, due_date, UserId: req.user.id })
  .then(data => res.status(201).json(data))
  .catch(err => next(err))
 }

 static getTodosId(req, res, next){
  const id = +req.params.id
   
  Todo.findByPk(id, {
    where: { UserId: req.user.id },
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    }
  })
  .then(data => {
    if (!data){
      throw{ status: 404 }
    } else {
      res.status(200).json({ message: data })
    }
  })
  .catch(err => next(err))
 }

 static updateTodos(req, res, next){
  const id = +req.params.id
  const { title, description, status, due_date } = req.body

  Todo.update({ title, description, status, due_date }, {
    where: { id },
    returning: true
  })
  .then(data => {
    if (data[0] === 0){
      throw{ status: 404 }
    } else {
      res.status(200).json({ message: data })
    }
  })
  .catch(err => next(err))
 }

 static updateStatus(req, res, next){
  const id = +req.params.id
  const { status } = req.body

  Todo.update({ status }, {
    where: { id },
    returning: true
  })
  .then(data => {
    if (data[0] === 0){
      throw { status: 404 }
    } else {
      let result = data[1][0].dataValues
      res.status(200).json({ message: result })
    }
  })
  .catch(err => next(err))
 }

 static deleteStatus(req, res, next){
  const id = +req.params.id
   
  Todo.destroy({
    where: {
      id
    }
  })
  .then(data => {
    if (!data){
      throw{ status: 404 }
    } else {
    res.status(200).json(`todo success to delete`)
    }
  })
  .catch(err => next(err))
 }
}

module.exports = TodoController