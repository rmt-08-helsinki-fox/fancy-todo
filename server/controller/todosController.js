const { Todo } = require('../models')
class TodosController {
	static viewTodo(req, res) {
		// res.send('udah masuk ke controller todo')
		Todo.findall()
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err)
			})

	}
	static addTodo(req, res) {

		console.log(req.body);
		const { title, description, status, due_date } = req.body
		const newTodo = { title, description, status, due_date }

		Todo.create(newTodo)
			.then(data => {
				res.status(201).json(data)
			})
			.catch(err => {
				if (err.errors.length > 0) {
					let errorMsg = []
					for (const i of err.errors) {
						errorMsg.push(i.message)
					}
					console.log(err);
					res.status(400).json({ msg: errorMsg })
				} else {
					console.log(err);
					res.status(500).json(err)
				}
			})

	}
	static find(req, res) {
		const id = +req.params.id
		Todo.findByPk(id)
			.then(data => {
				if (data) {
					console.log(data);
					res.status(200).json(data)
				} else {
					res.status(404).json({ msg: 'data not found' })
				}
			})
			.catch(err => {
				console.log(err);
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
				if (data === 1) {
					res.status(200).json(data[1])
				} else {
					res.status(404).json({ msg: 'data not found' })
				}
			})
			.catch(err => {
				if (err.errors.length > 0) {
					let message = []
					for (const i of err.errors) {
						message.push(i.message)
					}
					console.log(message);
					res.status(400).json(message)

				} else {
					console.log(err);
					res.status(500).json(err)

				}
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
					res.status(404).json({ msg: 'data not found' })
				}
			})
			.catch(err => {
				if (err.errors.length > 0) {
					let message = []
					for (const i of err.errors) {
						message.push(i.message)
					}
					console.log(message);
					res.status(400).json(message)

				} else {
					console.log(err);
					res.status(500).json(err)

				}
			})

	}
	static delete(req, res) {
		const id = +req.params.id
		Todo.destroy({ where: { id: id }, returning : true })
			.then(data => {
				console.log(data);
				if (data === 1) {
					res.status(200).json({ msg: 'todo success to delete' })
				}else {
					res.status(404).json({ msg: 'data not found' })
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err)
			})

	}
}

module.exports = TodosController