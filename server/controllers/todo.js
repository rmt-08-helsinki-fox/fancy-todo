const { Todo } = require('../models')

class TodoController {

  static add(req, res, next) {
    const { title, description, due_date } = req.body
    Todo.create({
      title: title,
      description: description,
      status: false,
      due_date: new Date(due_date),
      userId: req.user.id
    }, { returning: true })
    .then( data => {
      res.status(201).json(data)
    })
    .catch( err => {
      next(err)
    })
  }

  static showAll(req, res, next) {
    Todo.findAll()
    .then( data => {
      if (data.length !== 0) {
        res.status(200).json(data)
      } else {
        res.status(404).json([])
      }
    })
    .catch( err => {
      next(err)
    })
  }

  static showById(req, res, next) {
    const id = +req.params.id
    Todo.findByPk(id)
    .then( data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json([])
      }
    })
    .catch( err => {
      next(err)
    })
  }

  static update(req, res, next) {
    const { title, description, status, due_date } = req.body
    const id = +req.params.id
    Todo.update(
      {
        title: title || '',
        description: description || '',
        status: status || false && '',
        due_date: due_date || ''
      },
      { 
        where: { id: id },
        returning: true
      }
    )
    .then( data => {
      if (data[0] !== 0) {
        res.status(200).json(data[1][0])
      } else {
        res.status(404).json([])
      }
    })
    .catch( err => {
      next(err)
    })
  }

  static updateStatus(req, res, next) {
    const { status } = req.body
    const id = +req.params.id
    Todo.update(
      { status: status },
      { 
        where: { id: id },
        returning: true
      }
    )
    .then( data => {
      if (data[0] !== 0) {
        res.status(200).json(data[1][0])
      } else {
        res.status(404).json([])
      }
    })
    .catch( err => {
      next({err)
    })
  }

  static delete(req, res, next) {
    const id = +req.params.id
    Todo.destroy(
      { 
        where: { id: id },
        returning: true
      }
    )
    .then( data => {
      console.log(data);
      if (data !== 0) {
        res.status(200).json({
          message: "todo success to delete."
        })
      } else {
        res.status(404).json([])
      }
    })
    .catch( err => {
      next(err)
    })
  }

}

module.exports = TodoController