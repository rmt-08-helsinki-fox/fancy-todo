const { Todo, User } = require('../models')

class TodosController {
  static createTodo(req, res, next) {
    console.log(req.decode)
    let { id } = req.decode
    let {title, description, status, due_date} = req.body
      Todo.create({
        title,
        description,
        status,
        due_date,
        UserId: id
      }) 
        .then(todo => {
            res.status(201).json(todo)
      }) 
        .catch(err => {
          next(err)
        })
  }

    // ======= read todo ============
  static readTodo(req, res, next) {
    console.log(req.decode)
    let { id } = req.decode
    User.findAll({
      where: {
        id
      },
      include: [Todo]
    }) 
      .then(dataUser => {
        res.status(200).json(dataUser[0].Todos)
      })
      .catch(err => {
        next(err)
      })
  }

    // ========== read todo by id ===========
  static readTodoById(req, res, next) {
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
        next(err)
      })
  }

    // ========== edit todo all fields ==========
  static editTodoAllFields(req, res, next) {
    let id = +req.params.id
    let dataInput = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.body.UserId
    }
    Todo.update(dataInput, {
      where:{
        id
      },
        returning: true
    }).then(todo => {
      if(todo[0] === 0) throw {name: 'id not found', msg: 'error not found'}
      res.status(201).json(todo)
    }) .catch(err => {
      next(err)
    })
  }

    // ========= update Status =========
  static updateStatusById(req, res, next) {
    let id = +req.params.id
    let dataInput = {
      status: req.body.status
    }
    Todo.update(dataInput, {
      where:{
        id
      },
      returning: true
    }).then(todo => {
      if(todo[0] === 0) throw {name: 'id not found', msg: 'error not found'}
      res.status(200).json(todo)
    }) .catch(err => {
      next(err)
    })

  }

    // ============  delete todo ===========
  static deleteTodo(req, res, next) {
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
        next(err)
      })  
  }
}


module.exports = TodosController