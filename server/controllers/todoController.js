const {Todo} = require('../models/index')
const axios = require('axios')

class TodoController{
  static showTodo(req,res,next){
//{where:{UserId: req.decoded.id}}
    Todo.findAll({where:{UserId: req.decoded.id},
      order: [["id", "ASC"]]})
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
        let komik = title.toLowerCase()
        return axios({
          method: 'get',
          url: `https://superheroapi.com/api/${process.env.API_TOKEN}/search/${komik}`
        })
      })
      .then(game => {
        res.status(200).json({hasil, comic: game.data})
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
    const {title,description} = req.body
    const id = + req.params.id
    console.log(id, title, description);
    Todo.update({
      title, description
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
    const status = true
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

  static showComic(req,res,next){
    const id = + req.params.id
    
    Todo.findByPk(id)
      .then(data => {
        let komik = data.title.toLowerCase()
        return axios({
          method: 'get',
          url: `https://superheroapi.com/api/${process.env.API_TOKEN}/search/${komik}`
        })
      })
      .then(comic => {
        res.status(200).json({comic: comic.data})
      })
      .catch(err =>{
        next(err)
      })
  }
}

module.exports = TodoController