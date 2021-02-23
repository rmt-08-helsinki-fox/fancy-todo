const { Todo } = require("../models");

class TodoController {
	static getTodos(req, res, next) {
		Todo.findAll({
			where: {
				UserId: req.user.id,          
			},
      order: [["updatedAt", "DESC"]]
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

	static getTodosById(req, res, next) {
		const id = +req.params.id;
		const UserId = req.user.id;

		Todo.findOne({
			where: {
				id,
				UserId,
			},
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

	static postTodos(req, res, next) {
		const UserId = req.user.id;
		const { title, description, status, due_date } = req.body;
		const dataInput = { title, description, status, due_date, UserId };

		Todo.create(dataInput)
			.then((data) => {
				res.status(201).json({data, msg: "Successfully Added"});
			})
			.catch((err) => {
				next(err);
			});
	}

	static putTodosById(req, res, next) {
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
				res.status(200).json(data[1][0]);
			})
			.catch((err) => {
				next(err);
			});
	}

	static patchTodosById(req, res, next) {
		const id = +req.params.id;
		const dataInput = { status: true };

		Todo.update(dataInput, {
			where: {
				id,
			},
			returning: true,
		})
			.then((data) => {
				res.status(200).json(data[1][0]);
			})
			.catch((err) => {
				next(err);
			});
	}

	static deleteTodosById(req, res, next) {
		const id = +req.params.id;

		Todo.destroy({
			where: {
				id,
			},
		})
			.then((data) => {
				console.log(data);
				res.status(200).json({ msg: "Todo Success To Delete" });
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = TodoController;
