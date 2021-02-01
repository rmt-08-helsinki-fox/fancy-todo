const { Todo } = require("../models")

class Todo2 {
    static getTodo(req, res) {
      Todo.findAll()
        .then(todoList => {
          res.status(200).json(todoList)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
    static postTodo(req,res) {
      const { title, description, status, due_date } = req.body
      const newTodo = {
        title,
        description,
        status,
        due_date
      }
      Todo.create(newTodo)
        .then(newTodo1 => {
          res.status(201).json(newTodo1)
        })
        .catch(err => {
          if (err.errors){
            let errors = []
            err.errors.forEach(element => {
              errors.push(element.message)
            });
            res.status(400).json({message:errors})
          } else {
            res.status(500).json(err)
          }
        })
    }
    static getTodoId(req, res) {
      let id = +req.params.id
      console.log(id);
      Todo.findOne({where:{id:id}})
        .then(TodoId => {
          TodoId ? res.status(200).json(TodoId) : res.status(404).json({message:'error, not found'})
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
    static putTodoId(req, res) {
      let id = +req.params.id
      const { title, description, status, due_date } = req.body
      const newTodo = {
        title,
        description,
        status,
        due_date
      }
      Todo.update(newTodo,
        {where:{id:id}, returning: true})
          .then(updatedTodo =>{
            if (Number(updatedTodo[0]) === 1){
              res.status(200).json(updatedTodo)
            } else if (Number(updatedTodo[0]) === 0) {
              res.status(404).json({message:'error, not found'})
            }
          })
          .catch (err => {
            if (err.errors){
              let errors = []
            err.errors.forEach(element => {
              errors.push(element.message)
            });
            res.status(400).json({message:errors})
            } else {
              res.status(500).json(err)
            }
          })
    }
    static patchTodoId(req, res) {
      let id = +req.params.id
      let status = req.body.status
      Todo.update(
        {status},{
        where: {id:id},
        returning: true})
        .then(patchedTodo =>{
          if (Number(patchedTodo[0]) === 1){
            res.status(200).json(patchedTodo)
          } else if (Number(patchedTodo[0]) === 0) {
            res.status(404).json({message:'error, not found'})
          }
        })
        .catch (err => {
          if (err.errors){
            // console.log(err);
            let errors = []
            err.errors.forEach(element => {
              errors.push(element.message)
            });
            res.status(400).json({message:errors})
          } else {
            res.status(500).json(err)
          }
        })
    }
    static deleteTodoId(req,res) {
      let id = +req.params.id
      Todo.destroy({
        where:{id:id},
        returning: true})
          .then(deletestatus => {
            if (deletestatus === 1){
              res.status(200).json({message:'todo success to delete'})
            } else if (deletestatus === 0) {
              res.status(404).json({message:'error, not found'})
            }
          })
          .catch(err => {
            res.status(500).json(err)
          })

    }
}

module.exports = Todo2