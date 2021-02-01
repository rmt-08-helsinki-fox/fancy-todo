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
      // console.log(req.body);
      const { title, description, status, due_date } = req.body
      const newTodo = {
        title,
        description,
        status,
        due_date
      }
      // console.log(newTodo);
      Todo.create(newTodo)
        .then(newTodo1 => {
          // console.log(newTodo1);
          res.status(201).json(newTodo1)
        })
        .catch(err => {
          if (err.errors){
            res.status(400).json(err.errors[0])
          } else {
            // console.log(err);
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
              res.status(400).json(err.errors[0])
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
            res.status(400).json(err.errors[0])
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
            // console.log(dele);
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