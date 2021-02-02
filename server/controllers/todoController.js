const {Todo} = require('../models/index')
const axios = require('axios')

class TodoController{
  static showTodo(req,res,next){
//{where:{UserId: req.decoded.id}}
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static createTodo(req,res,next){
    const {title,description,status,due_date} = req.body
    let hasil
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId: req.decoded.id
    })
      .then(data => {
        hasil = data
        return axios({
          method: 'get',
          url: `https://www.cheapshark.com/api/1.0/games?title=batman&limit=10`
        })
      })
      .then(game => {
        res.status(200).json({hasil, game: game.data})
      })
      .catch(err => {
        next(err)
      })
  }

  static showIdTodo(req,res, next){
    const id = + req.params.id
    Todo.findByPk(id)
      .then(data => {
        if(!data) throw ({name:'customError', msg: 'Data not found', status: 404})
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static editTodo(req,res,next){
    const {title,description,status,due_date} = req.body
    const id = + req.params.id

    Todo.update({
      title, description, status, due_date
      }, {where:{id}, returning: true
    })
      .then(data => {
        if(!data[0]) throw ({name:'customError', msg: 'Data not found', status: 404})
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static editStatus(req,res,next){
    const {status} = req.body
    const id = + req.params.id
    Todo.update({status}, 
      {where:{id}, returning:true
    })
      .then(data => {
        if(!data[0]) throw ({name:'customError', msg: 'Data not found', status: 404})
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo(req,res,next){
    const id = + req.params.id
    Todo.destroy({where:{id}})
      .then(data => {
        console.log(data);
        if(data == 0) throw ({name:'customError', msg: 'Data not found', status: 404})
        res.status(200).json({message: "todo success to delete"})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController