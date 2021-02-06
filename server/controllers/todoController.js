const { Todo, Project, User } = require('../models')
const axios = require('axios');

class TodoController {
  // POST TODOS
  static addTodos(req, res, next) {
    let objTodos = {
        title: req.body.title,
        description: req.body.description,
        status: false,
        due_date: req.body.due_date,
        UserId: req.decoded.id
    }
    Todo.create(objTodos)
      .then(dataTodo => {
          res.status(201).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }
  // GET TODOS
  static getTodos(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(dataTodos => {
        res.status(200).json(dataTodos)
      })
      .catch(err => {
        next(err)
      })
  }
  // GET TODOS BY ID
  static getTodosById(req, res, next) {
    const id = +req.params.id
    Todo.findOne({
      where: {
        id: id,
        UserId: +req.decoded.id
      }
    })
      .then(dataTodo => {
        res.status(200).json(dataTodo)
      })
      .catch(err => {
        next(err)
      })
  }
  // PUT TODOS BY ID - UPDATE ALL ROWS
  static updateTodosAll(req, res, next) {
    // let message = []
    // if (!req.body.title) {
    //   // const message = err.errors.map(element => element.message)
    //   // throw { name: 'Invalid Data', statusCode: 400, msg: 'Invalid Data'}
    //   message.push('Title is required')
    // } 
    // if (!req.body.description) {
    //   message.push(`Description is required`)
    // }
    // if (!req.body.status) {
    //   message.push(`Status is required`)
    // } 
    // if (!req.body.due_date) {
    //   message.push(`due_date is required`)
    // }
    // if (message.length > 0) {
    //   throw { name: `SequelizeValidationError`, statusCode: 400, msg: message}
    // } 
    const id = +req.params.id
    const objTodos = {
      title: req.body.title,
      description: req.body.description,
      status: false,
      due_date: req.body.due_date
    }
    Todo.update(objTodos, {
      where: {
          id: id,
          UserId: +req.decoded.id
      },
      returning: true
    })
      .then(dataTodoUpdate => {
        res.status(200).json(dataTodoUpdate[1][0])
      })
      .catch(err => {
        next(err)
      }) 
  }
  // PATCH TODOS BY ID - UPDATE SELECTED ROWS
  static updateTodosSelectedRows(req, res, next) {
    if (!req.body.status) {
      throw { name: `SequelizeValidationError`, statusCode: 400, msg: [`Status is required`]}
    } 
    const id = +req.params.id
    const objTodos = {
      status: req.body.status
    }
    Todo.update(objTodos, {
        where: {
            id: id,
            UserId: +req.decoded.id
        },
        returning: true
    })
    .then(dataTodoUpdate => {
      res.status(200).json(dataTodoUpdate[1][0])
    })
    .catch(err => {
      next(err)
    })
  }
  static deleteTodos(req, res, next) {
    let id = +req.params.id
    Todo.destroy({
      where: {
        id: id,
        UserId: +req.decoded.id
      }
    })
    .then(dataTodo => {
      res.status(200).json({
        'messages': 'todo succes to delete'
      })
    })
    .catch(err => {
      next(err)
    })
  }
  // READ PROJECT FROM api.creativecommons. -- 3rd PARTY API
  static projectList(req,res,next) {
    let tmp = []
    axios({
      method: "GET",
      url: `http://api.creativecommons.engineering/v1/images/`,
      headers: {
        Authorization: `Bearer DLBYIcfnKfolaXKcmMC8RIDCavc2hW`
      } 
    })
      .then(response => {
        response.data.results.forEach(element => {
          tmp.push({
            title: element.title,
            url: element.url
          })
        })
        res.status(200).json(tmp)
        
      })  
      .catch(err => {
        next(err)
      })
  }
  // add project
  static addProject(req, res, next) {
    const objProject = {
      title: req.body.title,
      url: req.body.url,
      UserId: req.decoded.id
    }
    Project.create(objProject)
      .then(project => {
        res.status(201).json(project)
      })
      .catch(err => {
        const message = err.errors.map(element => element.message)
        const error = { name: err.name, statusCode: 400, msg: message}
        next(error)
      })
  }
  // saved project List
  static userProjectList(req, res, next) {
    Project.findAll({
      include: User
    })
      .then(project => {
        res.status(200).json(project)
      })
      .catch(err => {
        next(err)
      })
  }
  // delete project
  static deleteProjectUser(req, res, next) {
    Project.destroy({
      where: {
        id: +req.params.id
      }
    })
      .then(data => {
        res.status(200).json({
          'messages': 'todo succes to delete'
        })
      })
      .catch(err => {
        next(err)
      })
  }
  // static inviteUser(req, res, next) {

  // }
}


module.exports = TodoController