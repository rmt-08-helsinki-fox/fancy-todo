const {Todo} = require('../models/index')

class TodoController{
  static showTodo(req,res){
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createTodo(req,res){
    const {title,description,status,due_date} = req.body
    console.log(req.body);
    Todo.create({
      title,
      description,
      status,
      due_date
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static showIdTodo(req,res){
    const id = + req.params.id
    Todo.findByPk(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static editTodo(req,res){
    const {title,description,status,due_date} = req.body
    const id = + req.params.id

    Todo.update({
      title, description, status, due_date
      }, {where:{id}, returning: true
    })
      .then(data => {
        if(!data[0]) throw error({msg: "Tidak ada data"})
        res.status(201).json(data)
      })
      .catch(err => {
        if(err.errors){
          let error = []
          err.errors.forEach(el => {
            error.push(el.message)
          })
          res.status(400).json({msg: error})
        }else{
          res.status(404).json(err)
        }
      })
  }

  static editStatus(req,res){
    
  }
}

module.exports = TodoController