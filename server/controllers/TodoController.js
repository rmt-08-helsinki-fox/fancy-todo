const { Todo } = require("../models");

class TodoController {
	static getTodos(req, res) {
		Todo.findAll()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json({ message: "Internal Server Error" });
			});
	}

	static getTodosById(req, res) {
		const id = +req.params.id;

		Todo.findByPk(id)
			.then((data) => {
				if (!data) res.status(404).json({ message: "Error: Not Found" });
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json({ message: "Internal Server Error" });
			});
	}

	static postTodos(req, res) {
		const { title, description, status, due_date } = req.body;
		const dataInput = { title, description, status, due_date };

		Todo.create(dataInput)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				if (err.message) res.status(400).json(err.errors[0]);
				res.status(500).json({ message: "Internal Server Error" });
			});
	}

	static putTodosById(req, res) {
		const id = +req.params.id;
		const { title, description, status, due_date } = req.body;
		const dataInput = { title, description, status, due_date };

		Todo.update(dataInput, {
			where: {
				id,
			},
			returning: true,
		})
			.then((data) => {
				if (!data[0]) res.status(404).json({ message: "Error: Not Found" });
				res.status(200).json(data[1][0]);
			})
			.catch((err) => {
				if (err.message) res.status(400).json(err.errors[0]);
				res.status(500).json({ message: "Internal Server Error" });
			});
	}

	static patchTodosById(req, res) {
		const id = +req.params.id;
		const dataInput = { status: true };

		Todo.update(dataInput, {
			where: {
				id,
			},
			returning: true,
		})
			.then((data) => {
				if (!data[0]) res.status(404).json({ message: "Error: Not Found" });
				res.status(200).json(data[1][0]);
			})
			.catch((err) => {
				if (err.message) res.status(400).json(err.errors[0]);
				res.status(500).json({ message: "Internal Server Error" });
			});
	}

	static deleteTodosById(req, res) {
		const id = +req.params.id;

		Todo.destroy({
			where: {
				id,
			},
		})
			.then((data) => {
				console.log(data);
				if (!data) res.status(404).json({ message: "Error: Not Found" });
				res.status(200).json({ message: "Todo Success To Delete" });
			})
			.catch((err) => {
				res.status(500).json({ message: "Internal Server Error" });
			});
	}
}

module.exports = TodoController;
