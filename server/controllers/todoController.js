const { ToDo } = require('../models/todo.js')

class todoController {
  static getToDos(req, res) {
    // const todos = [
    //     {
    //         id: 1,
    //         title: "belajar",
    //         status: false,

    //     },
    //     {
    //         id: 2,
    //         title: "baca buku",
    //         status: false,

    //     }
    // ];

    // res.status(200).json(todos)
    // res.send('tes')

    ToDo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })

  }
  static addToDos(req, res) {
    const { title, description, due_date } = req.body
    ToDo.create({
      title, description, due_date
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    console.log(req.body);
    res.json('tes')
  }

  static updateToDos(req, res) {

  }
}

module.exports = todoController