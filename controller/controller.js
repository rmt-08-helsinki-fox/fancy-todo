const { Todo, User } = require('../models')
const { ValidationError } = require('sequelize')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class Controller {

  static register(req, res){
    const { name, email, username, password } = req.body
    User.create({ name, email, username, password })
    .then(data => {
      res.status(201).json({
        msg : 'Register success',
        id : data.id,
        username : data.username,
        email : data.email,
        user : data.user
      })
    })
    .catch(err => {
      if(err instanceof ValidationError){
        res.status(400).json(err.errors[0].message)
       } else{
         res.status(500).json(err.message)
       }
    })
  }

  static login(req, res){
    const { username, password } = req.body
    User.findOne({ 
      where: {
        username 
      } 
    })
    .then(data => {
      if(!data) throw {msg : 'Invalid email or password'}
      const comparedPass = comparePass(password, data.password)
      if(!comparedPass) throw {msg : 'Invalid email or password'}
      //bikin token
      const access_token = generateToken({
        username: data.email,
        email: data.email,
        role: data.role
      })
      res.status(200).json({ access_token })
    })
    .catch(err => {
      const error = err.msg || 'Internal Server Error'
      res.status(400).json({ error })
    })
  }

  static postTodos(req, res){
    const { title, description, due_date } = req.body 
     Todo.create({
       title, description, due_date
     })
     .then(data => {
       res.status(201).json(data)
     })
     .catch(err => {
       if(err instanceof ValidationError){
        res.status(400).json(err)
       }
       res.status(500)
     })
  }

  static getTodos(req, res){
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static getTodosById(req, res){
    let id = +req.params.id
    Todo.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json({ error })
    })
  }

  static putTodosById(req, res){
    const id = +req.params.id
    const { title, description, due_date } = req.body 
    Todo.update({
      title,
      description,
      due_date
    }, {where : {
      id
    }})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }

  static patchTodosById(req, res){
    const id = +req.params.id
    Todo.update({
      status : true
    }, {where : {id}})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }
}

module.exports = Controller