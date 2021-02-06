const { Todo, User } = require('../models')
const { ValidationError } = require('sequelize')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios')

class Controller {

  static register(req, res, next){
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
      // if(err instanceof ValidationError){
      //   res.status(400).json(err.errors[0].message)
      //  } else{
      //    res.status(500).json(err.message)
      //  }
      console.log(err.name)
      next(err)
    })
  }

  static login(req, res, next){
    const { username, password } = req.body
    User.findOne({ 
      where: {
        username 
      } 
    })
    .then(data => {
      if(!data) throw {msg : 'Invalid email or password'}
      const comparedPass = comparePass(password, data.password)
      if(!comparedPass) throw { name: 'InvalidUserPass', message : 'Invalid email or password' }
      //bikin token
      const access_token = generateToken({
        username: data.email,
        email: data.email,
        role: data.role,
        id : data.id
      })
      res.status(200).json({ access_token })
    })
    .catch(err => {
      next(err)
    })
  }

  static postTodos(req, res, next){
    const id = +req.decoded.id
    const { title, description, due_date } = req.body 
     Todo.create({
       title, description, due_date, UserId : id
     })
     .then(data => {
       res.status(201).json(data)
     })
     .catch(err => {
      //  if(err instanceof ValidationError){
      //   res.status(400).json(err)
      //  }
      //  res.status(500)
      next(err)
     })
  }

  static getTodos(req, res, next){
    const id = +req.decoded.id
    Todo.findAll({
      where : {
        UserId : id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static getTodosById(req, res, next){
    let id = +req.params.id
    Todo.findByPk(id)
    .then(data => {
      //ga boleh access todos orang lain
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static putTodosById(req, res, next){
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
      next(err)
    })
  }

  static patchTodosById(req, res, next){ //merubah status todos dari false ke true
    const id = +req.params.id
    Todo.update({
      status : true
    }, {where : {id}})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  //Trying to use api
  static changeMyFate(req, res, next){
    axios.get('https://jobs.github.com/positions.json?description=javascript')
    .then(data => {
      let infopiece = {}
      let info = data.data.map(el => {
        
          infopiece.title = el.title;
          infopiece.company = el.company;
          infopiece.url = el.company_url
        
        return infopiece
      })
      res.json(info)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller