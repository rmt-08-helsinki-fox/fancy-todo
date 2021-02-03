const { Todo } = require('../models')

class TodoController{
    static createTodo(req, res, next) {
        const { title, description, due_date } = req.body
        const UserId = req.decode.id
        let newTodo = {
            title,
            description,
            due_date,
            UserId
        }

        Todo.create(newTodo)
        .then(todo => {
          res.status(201).json(todo)
        })
        .catch(err => {
          next(err)
        })
    }

    static getAll(req ,res, next) {
      const UserId = req.decode.id
        Todo.findAll({
          where: {
            UserId
          }
        })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
          next(err)
        })
    }

    static getById(req, res, next) {
        const id = +req.params.id

        Todo.findByPk(id)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
          console.log(err)
          next(err)
        })
    }

    static updateTodo(req, res, next) {
        const id = +req.params.id
        const { title, description, status, due_date } = req.body
        let updatedTodo = {
            title,
            description,
            status,
            due_date
        }

        Todo.update(updatedTodo,
            {
            where: {
                id
						},
						returning: true
				})
				.then(todo => {
          res.status(200).json(todo[1][0])
				})
				.catch(err => {
          next(err)
				})
		}
		
		static updateStatus(req ,res, next) {
			const id = +req.params.id
      let newStat = req.body
      
      Todo.update(newStat, {
        where: {
          id
        },
        returning: true
      })
      .then(todo => {
        res.status(200).json(todo[1][0])
      })
      .catch(err => {
        next(err)
      })
		}

		static deleteTodo(req, res, next) {
			const id = +req.params.id

			Todo.destroy({
				where: {
					id
				},
				returning: true
			})
			.then(() => {
        res.status(200).json({message: `todo berhasil dihapus`})
			})
			.catch(err => {
        next(err)
			})
		}
}

module.exports = TodoController