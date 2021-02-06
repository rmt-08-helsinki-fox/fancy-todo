const { Todo } = require('../models')
const { formatDate, getYear } = require('../helpers/formatDate')
const holiday = require('../helpers/getDataFromApi')

class TodoController {
  static async postTodo(req, res, next) {
    try {
      const { title, description, due_date } = req.body
      let newTodo = await Todo.create({
        title,
        description,
        due_date,
        UserId: +req.decoded.id
      })
      res.status(201).json(newTodo)
    } catch (error) {
      next(error)
    }
  }


  static async getTodo(req, res, next) {
    try {
      let todos = await Todo.findAll()
      res.status(200).json(todos)
    } catch (error) {
      console.log(error, '----error controller get todo')
      next(error)
    }
  }

  static async getTodoById(req, res, next) {
    try {
      const id = +req.params.id
      let todo = await Todo.findByPk(id)
      let getHolidays = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=eb44d4079e833ea34d1b75c332d28ef9e4ce8324d2ef9366ffc276ece8e1f386&country=ID&year=${getYear(todo.due_date)}`)
      let holidays = getHolidays.data.response.holidays
      if (todo) {
        let events = []
        holidays.forEach(day => {
          if (formatDate(todo.due_date) === formatDate(day.date.iso)) {
            events.push(day.name)
          }
        })
        res.status(200).json({ todo, events })
      } else {
        throw ({ msg: "Todo is not Found", status: 400 })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getTodoUser(req, res, next) {
    try {
      let todos = await Todo.findAll({
        where: {
          UserId: +req.decoded.id
        },
        order: [['due_date','ASC']]
      })
      let result = []
      if (todos.length !== 0){
        todos.forEach((elm) => {
          result.push(holiday(elm))
        })
        const resolveResult = await Promise.all(result)
        result = resolveResult
      }
      // console.log(result)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const id = +req.params.id
      const { title, description, status, due_date } = req.body
      let obj = {}

      if (title) {
        obj.title = title
      }
      if (description) {
        obj.description = description
      }
      if (status) {
        obj.status = status
      }
      if (due_date) {
        obj.due_date = due_date
      }
      let todo = await Todo.update(obj, {
        where: {
          id: id
        },
        returning: true
      })

      if (todo[0] === 0) {
        throw ({ msg: "Todo is not Found", status: 400 })
      } else {
        res.status(200).json(todo[1][0])
      }

    } catch (error) {
      next(error)
    }
  }

  static async updateStatusTodo(req, res, next) {
    try {
      const id = +req.params.id
      const status = req.body.status
      let todo = await Todo.update({status}, { where: { id }, returning: true })
      if (todo[0] === 0) {
        throw ({ msg: "Todo is not Found", status: 404 })
      } else {
        res.status(200).json(todo[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const id = +req.params.id
      let todo = await Todo.findByPk(id)
      if (todo) {
        Todo.destroy({
          where: {
            id: id
          }
        })
        res.status(200).json(todo)
      } else {
        throw ({ msg: "Todo is not Found", status: 404 })
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = TodoController