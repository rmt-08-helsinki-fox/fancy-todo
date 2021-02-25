// const { noExtendLeft } = require('sequelize/types/lib/operators');
const { Todo } = require('../models')
class TodosController {
	static viewTodo(req, res, next) {
		// res.send('udah masuk ke controller todo')
		Todo.findAll({where: {UserId : +req.decoded.id}})
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				console.log(err);
				next(err)
			}) 

	}
	static addTodo(req, res, next) {

		console.log(req.body);
		const { title, description, status, due_date} = req.body
		const newTodo = { title, description, status, due_date, UserId:+req.decoded.id}

		Todo.create(newTodo)
			.then(data => {
				res.status(201).json(data)
			})
			.catch(err => {
				// if (err.errors.length > 0) {
				// 	next({msg : 'validate error'})

				// } else {
					console.log(err);
					next(err)
					// res.status(500).json(err)
				// }
			})

	}
	static find(req, res, next) {
		const id = +req.params.id
		Todo.findByPk(id)
			.then(data => {
				console.log(data);
					res.status(200).json(data)
			})
			.catch(err => {
				console.log(err);
				// next(err)
				res.status(500).json(err)
			})
	}
	static update(req, res) {
		const id = +req.params.id
		const { title, description, status, due_date } = req.body
		const updateTodo = { title, description, status, due_date }
		Todo.update(updateTodo, {
			where: { id: id },
			returning: true
		})
			.then(data => {
				console.log(data);
				if (data[0] === 1) {
					res.status(200).json(data[1])
				} else {
					next({name : 'data not found'})
					// res.status(404).json({ msg: 'data not found' })
				}
			})
			.catch(err => {
				// if (err.errors.length > 0) {
				// 	next({msg : 'validate error'})
				// 	// res.status(400).json(message)

				// } else {
				// 	console.log(err);
					next(err)
					// res.status(500).json(err)

				// }
			})

	}
	static patch(req, res) {
		const id = +req.params.id
		const { status } = req.body
		const updateTodo = { status }
		Todo.update(updateTodo, {
			where: { id: id },
			returning: true
		})
			.then(data => {
				console.log(data);
				if (data[0] === 1) {
					res.status(200).json(data[1])
				} else {
					next({name : 'data not found'})
					// res.status(404).json({ msg: 'data not found' })
				}
			})
			.catch(err => {
				// if (err.errors.length > 0) {
				// 	let message = []
				// 	for (const i of err.errors) {
				// 		message.push(i.message)
				// 	}
				// 	console.log(message);
				// 	next({msg : 'validate error'})
				// 	// res.status(400).json(message)

				// } else {
				// 	console.log(err);
					next(err)
					// res.status(500).json(err)

				// }
			})

	}
	static delete(req, res) {
		const id = +req.params.id
		Todo.destroy({ where: { id: id }, returning : true })
			.then(data => {
				console.log(data);
				if (data === 1) {
					res.status(200).json({ message: 'todo success to delete' })
				}else {
					next({name : 'data not found'})
					// res.status(404).json({ msg: 'data not found' })
				}
			})
			.catch(err => {
				console.log(err);
				next(err)
				// res.status(500).json(err)
			})

	}
}

module.exports = TodosController