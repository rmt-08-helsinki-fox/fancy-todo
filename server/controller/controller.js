const { Todo, User } = require('../models')
const { ValidationError } = require('sequelize')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios')
const { OAuth2Client } = require('google-auth-library');
class Controller {

  static googleLogin(req, res, next){
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ''
    let name = ''
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience : process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email
      name = payload.name
      console.log(payload)
      return User.findOne({where :{
        email
      }})
    })
    .then(user => {
      if(user){
        const access_token = generateToken({
          email: user.email,
          role: user.role,
          id : user.id
        })
        res.status(200).json({ access_token })
      }else {
        return User.create({name, email, password : process.env.USER_PWD_GOOGLE})
      }
    })
    .then(registeredUser => {
      const access_token = generateToken({
        email: registeredUser.email,
        role: registeredUser.role,
        id : registeredUser.id
      })
      res.status(201).json({ access_token })
    })
    .catch(err => {
      next(err)
    })
}


  static register(req, res, next){
    const { name, email, password } = req.body
    User.create({ name, email, password })
    .then(data => {
      res.status(201).json({
        msg : 'Register success',
        id : data.id,
        email : data.email,
        user : data.user
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next){
    const { email, password } = req.body
    User.findOne({ 
      where: {
        email 
      } 
    })
    .then(data => {
      if(!data) throw {name: 'DataNotFound', message : 'Data Not Found'}
      const comparedPass = comparePass(password, data.password)
      if(!comparedPass) throw { name: 'InvalidUserPass', message : 'Invalid email or password' }
      //bikin token
      const access_token = generateToken({
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
      next(err)
     })
  }

  static delTodo(req, res, next){
    const id = +req.params.id
    console.log(id)
    Todo.destroy({
      where : {
        id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
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