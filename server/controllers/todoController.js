const { Todo, User } = require('../models')

class TodoController {
    static showAll(req, res, next) {
        Todo.findAll({
            include: {
                model:User,
                attributes: ['email']
            },
            order: [['id', 'ASC']]
        })
        .then(data => res.status(200).json(data))
        .catch(err => {next(err)})
    }

    static create(req, res, next) {
        // console.log(req.user);
        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || "false",
            due_date: req.body.due_date,
            UserId: req.user.id
        }
        // console.log(value, '<<<<<<');
        Todo.create(value)
        .then(data => res.status(201).json(data))
        .catch(err => {
          if(err.name === 'SequelizeValidationError') {
            next({
              status:400,
              errors: err.errors
            })
          } else next(err)
        })
    }

    static getOne(req, res, next) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
          if(!data) next({status:404})
          else res.status(200).json(data)
        })
        .catch(err => {next(err)})
    }

    static putTodo(req, res, next) {
        let id = +req.params.id
        const {title, description, status, due_date} = req.body
        const value = {
            title,
            description,
            status,
            due_date
        }
        // console.log(value, '<<<<<<<');
        Todo.update(value, {
            where: {id},
            returning: true
        })
        .then(data => {
            if(data[0]) {
              let output = data[1][0].dataValues
              // console.log(output);
              res.status(200).json(output)
            } else next({status:404})
        })
        .catch(err => {
          if(err.name === 'SequelizeValidationError') {
            next({
              status: 400,
              errors: err.errors
            })
          } else next(err)
        })
    }

    static patchTodo(req, res, next) {
        let id = +req.params.id
        const value = {
            status: req.body.status
        }
        Todo.update(value, {
            where: {id},
            returning: true
        })
        .then(data => {
          if(data[0]) {
            let output = data[1][0].dataValues
            // console.log(output);
            res.status(200).json(output)
          } else next({status:404})
        })
        .catch(err => {
          if(err.name === 'SequelizeValidationError') {
            next({
              status: 400,
              errors: err.errors
            })
          } else next(err)
        })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        Todo.destroy({
            where: {id}
        })
        .then(data => {
            if(!data) next({status:404})
            else res.status(200).json({message: 'Todo success to delete'})
        })
        .catch(err => {next(err)})
    }
}

module.exports = TodoController