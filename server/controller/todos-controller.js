const { Todo } = require('../models')

class TodosController {
  static createTodo(req, res) {
    let {title, description, status, due_date} = req.body
      Todo.create({
        title,
        description,
        status,
        due_date
      }) 
        .then(todo => {
            res.status(201).json(todo)
      }) 
        .catch(err => {
          if(err.name === 'SequelizeValidationError') {
            res.status(400).json(err.errors[0])
          } else {
            res.status(500).json(err)
          }
        })
  }

    // ======= read todo ============
  static readTodo(req, res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

    // ========== read todo by id ===========
  static readTodoById(req, res) {
    let id = +req.params.id
    Todo.findOne({
      where:{
        id
      }
    })
      .then(todo => {
        if(!todo) throw {name: 'id not found', msg: 'error not found'}
        res.status(200).json(todo)
      })
      .catch(err => {
        console.log(err)
        if(err.name === 'id not found') {
          res.status(404).json(err)
        } else {
          res.status(500).json(err)
        }
      })
  }

    // ========== edit todo all fields ==========
  static editTodoAllFields(req, res) {
    let id = +req.params.id
    let dataInput = req.body
    console.log(dataInput)
    Todo.update(dataInput, {
      where:{
        id
      },
        returning: true
    }).then(todo => {
      if(todo[0] === 0) throw {name: 'id not found', msg: 'error not found'}
      res.status(201).json(todo)
    }) .catch(err => {
      if(err.name === 'id not found') {
        res.status(404).json(err)
      } else if(err.name === 'SequelizeValidationError') {
        res.status(400).json(err)
      } else {
        res.status(500).json(err)
      }
    })
  }

    // ========= edit todo per fields =========
  static editTodoPerFields(req, res) {
    let id = +req.params.id
    let dataInput = req.body
    Todo.update(dataInput, {
      where:{
        id
      },
      returning: true
    }).then(todo => {
      if(todo[0] === 0) throw {name: 'id not found', msg: 'error not found'}
      res.status(200).json(todo)
    }) .catch(err => {
      if(err.name === 'id not found') {
        res.status(404).json(err)
      } else if(err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors[0])
      } else {
        res.status(500).json(err)
      }
    })

  }

    // ============  delete todo ===========
  static deleteTodo(req, res) {
    let id = +req.params.id
    Todo.destroy({
      where: {
        id
      },
      returning: true
      }) .then(todo => {
        console.log(todo)
        if(todo === 0) throw {name: 'id not found', msg: 'error not found'}
        res.status(200).json({msg: 'delete succes'})
      }) .catch(err => {
        if(err.name === 'id not found') {
          res.status(404).json(err)
        } else {
          res.status(500).json(err)
        }
      })  
  }
}


module.exports = TodosController