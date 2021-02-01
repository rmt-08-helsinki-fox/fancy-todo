const { Todo } = require('../models')

class todoController {
  static async readAll (req, res) {
    // res.send('masuk controller')
    try {
      const read = await Todo.findAll()
      // console.log('masuk')
      res.status(200).json(read)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async readById (req, res) {
    const id = +req.params.id
    try {
      const readId = await Todo.findByPk(id)
      if (!readId) {
        res.status(404).json({
          msg: 'Todos is undefined'
        })
      } else {
        res.status(200).json(readId)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async createTodo (req, res) {
    const { title, description, status, due_date } = req.body
    // console.log(req.body)
    try {
      const create = await Todo.create({
        title,
        description,
        status,
        due_date
      })
      res.status(201).json(create)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }
  static async putTodo (req, res) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    try {
      const find = await Todo.findOne({
        where: { id }
      })
      if (find) {
        const update = await Todo.update({
          title,
          description,
          status,
          due_date
        }, {where: { id }, returning:true})
        res.status(200).json(update[1][0])
      } else {
        res.status(404).json({
          msg: 'Todos is undefined'
        })
        // throw ({msg: 'Todos is undefined'})
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async patchTodo (req, res) {
    const id = +req.params.id
    const status = req.body.status
    try {
      const data = await Todo.findByPk(id)
      if (!data) {
        res.status(404).json({
          msg: 'Todos is undefined'
        })
      } else {
        const updated = await Todo.update(
          { status }, {where: { id }, returning: true}
        )
        res.status(200).json(updated[1][0])
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async deleteTodo (req, res) {
    const id = +req.params.id
    try {
      const find = await Todo.findByPk(id)
      if (!find) {
        res.status(404).json({
          msg: 'Todos is undefined'
        })
      } else {
        const remove = await Todo.destroy({
          where: { id }
        })
        res.status(200).json({
          msg: 'Todo was deleted'
        })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = todoController