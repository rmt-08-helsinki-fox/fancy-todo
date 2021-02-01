const { Todo } = require('../models')

class TodoController{
    static createTodo(req, res) {
        const { title, description, due_date } = req.body
        let newTodo = {
            title,
            description,
            due_date 
        }

        Todo.create(newTodo)
        .then(todo => {
          res.status(201).json(todo)
        })
        .catch(err => {
          if(err.name === 'SequelizeValidationError') {
            res.status(400).json(err.errors)
          } else {
            res.status(500).json(err)
          }
        })
    }

    static getAll(req ,res) {
        Todo.findAll()
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getById(req, res) {
        const id = +req.params.id

        Todo.findByPk(id)
        .then(todo => {
          !todo ? res.status(404).json({error: 'not found'}) : res.status(200).json(todo)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }

    static updateTodo(req, res) {
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
					!todo[1][0] ? res.status(404).json({error: 'not found'}) : res.status(200).json(todo[1][0])
				})
				.catch(err => {
          if(err.name === 'SequelizeValidationError') {
            res.status(400).json(err)
          } else {
            res.status(500).json(err)
          }
				})
		}
		
		static updateStatus(req ,res) {
			const id = +req.params.id
      let newStat = req.body
      console.log(newStat)

      Todo.update(newStat, {
        where: {
          id
        },
        returning: true
      })
      .then(todo => {
        !todo[1][0] ? res.status(404).json({error: 'not found'}) : res.status(200).json(todo[1][0])
      })
      .catch(err => {
          if(err.name === 'SequelizeValidationError') {
            res.status(400).json(err.errors[0])
          }else {
            res.status(500).json(err)
          }
      })
		}

		static deleteTodo(req, res) {
			const id = +req.params.id

			Todo.destroy({
				where: {
					id
				},
				returning: true
			})
			.then(todo => {
					!todo ? res.status(404).json({error: 'not found'}) : res.status(200).json({message: `todo berhasil dihapus`})
			})
			.catch(err => {
				res.status(500).json(err)
			})
		}
}

module.exports = TodoController