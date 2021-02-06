const { Todo } = require("../models")
const axios = require("axios")
const EXCHANGEAPI = process.env.EXCHANGEAPI

class TodoController {

  static addTodo(req, res, next) {
    const UserId = req.decoded.id
    const { title, description, due_date } = req.body
    Todo.create({ title, description, due_date, UserId})
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTodo(req, res, next) {
    const id = req.decoded.id
    Todo.findAll({where:{UserId:id}})
      .then(todos => {
        // console.log(todos);
        const newTodos = todos.map(e => {
          return {
            id: e.id,
            title: e.title,
            description: e.description,
            status: e.status,
            due_date: e.due_date.toDateString(),
            UserId: e.UserId
          }
        });
        // console.log(newTodos);
        res.status(200).json(newTodos)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTodoId(req, res, next) {
    const id = +req.params.id
    Todo.findByPk(id)
      .then(todo => {
        if (!todo) {
          throw { error: "not found", status: 404 }
        } else {
          res.status(200).json(todo)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static putTodo(req, res, next) {
    const { title, description, status, due_date } = req.body
    Todo.update({ title, description, status, due_date },
      {
        where: {id: req.params.id},
        returning: true
      })
      .then(todo => {
        if (todo[0] == 0) {
          throw { error: "not found", status: 404 }
        } else {
          res.status(200).json(todo)
        }
      })
      .catch(err => {
        next(err)
      })

  }

  static patchTodo(req, res, next) {
    const id = req.params.id
    const { status } = req.body
    Todo.update({ status }, {where:{id}, returning:true})
      .then(todo => {
        if (todo[0] == 0) {
          throw { error: "not found", status : 404 }
        } else {
          res.status(200).json(todo)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  
  static deleteTodo(req, res, next) {
    // console.log('di delete');
    const id = req.params.id
    // console.log(id);
    Todo.destroy({where:{id}})
      .then(todo => {
        if (todo == 0) {
          throw { error: "not found", status: 404 }
        } else {
          res.status(200).json({message: "todo success to delete"})
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static exchangeRate(req, res, next) {
    
    axios({
      method: "get",
      url: `https://v6.exchangerate-api.com/v6/${EXCHANGEAPI}/pair/USD/IDR`
    })
      .then(response => {
        // console.log(response);
        res.json(response.data.conversion_rate)
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TodoController