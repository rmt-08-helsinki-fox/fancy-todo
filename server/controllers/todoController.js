const { Todo } = require('../models');

class TodoController{
	static createTodo(req,res){
		const { title,description,status,due_date } = req.body
		Todo
			.create({
				title,
				description,
				status,
				due_date
			},{
				returning: true
			})
			.then(todo => {
				res.status(201).json(todo)
			})
			.catch(err => {
				console.log(err);
				if (err.message === 'invalid date') res.status(400).json(err)
				else {
					res.status(500).json(err)
				}
			})
	}
	static getAllTodo(req,res){
		Todo
			.findAll()
			.then(todos => {
				res.status(200).json(todos)
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err)
			})
	}
	static getAllTodoById(req,res){
		const id = +req.params.id
		Todo
			.findOne({
				where: {
					id
				}
			})
			.then(todo => {
				if (!todo) throw { msg: `there is no todo with id: ${id}` }
				res.status(200).json(todo)
			})
			.catch(err => {
				console.log(err);
				res.status(404).json(err)
			})
	}
	static updateTodo(req,res){
		const { title,description,status,due_date } = req.body
		const id = +req.params.id
		Todo
			.update({
				title,
				description,
				status,
				due_date
			},{
				returning: true,
				where:{
					id
				}
			})
			.then(todo => {
				if (!todo[0]) throw { msg: `there is no todo with id: ${id}` }
				console.log(todo);
				res.status(200).json(todo)
			})
			.catch(err => {
				console.log(err);
				if (err.message === 'invalid date') res.status(400).json(err)
				else if (err.msg){
					res.status(404).json(err)
				} else {
					res.status(500).json(err)
				}
			})
	}
	static updateStatusTodo(req,res){
		const { status } = req.body
		const id = +req.params.id
		Todo
			.update({status},{
				where:{
					id
				},
				returning: true
			})
			.then(todo => {
				if (!todo[0]) throw {msg: `there is no todo with id: ${id}`}
				// console.log(todo);
				res.status(200).json(todo)
			})
			.catch(err => {
				console.log(err);
				if(err.msg) res.status(404).json(err)
				else{
					res.status(500).json(err)
				}
			})
	}
	static destroyTodo(req,res){
		const id = +req.params.id
		Todo
			.destroy({
				where: {
					id
				}
			})
			.then(todo => {
				const msg = 'todo has been deleted'
				if (!todo) throw {msg: `there is no todo with id: ${id}`}
				res.status(200).json({ msg })
			})
			.catch(err => {
				console.log(err);
				if (err.msg) res.status(404).json(err)
				else {
					res.status(500).json(err)
				}
			})
	}
}

module.exports = TodoController