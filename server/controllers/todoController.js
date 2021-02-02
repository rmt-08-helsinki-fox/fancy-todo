const { Todo } = require('../models');

class TodoController{
	static createTodo(req,res,next){
		const { title,description,status,due_date,UserId } = req.body
		Todo
			.create({
				title,
				description,
				status,
				due_date,
				UserId
			},{
				returning: true
			})
			.then(todo => {
				res.status(201).json(todo)
			})
			.catch(err => {
				next(err)
			})
	}
	static getAllTodo(req,res,next){
		Todo
			.findAll()
			.then(todos => {
				res.status(200).json(todos)
			})
			.catch(err => {
				next(err)
			})
	}
	static getTodoById(req,res,next){
		const id = +req.params.id
		// console.log(id);
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
				// console.log('masuk sini >>>>>>>>>>>>>>>');
				next(err)
			})
	}
	static updateTodo(req,res,next){
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
				console.log(todo[1]);
				res.status(200).json(todo[1])
			})
			.catch(err => {
				next(err)
			})
	}
	static updateStatusTodo(req,res,next){
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
				next(err)
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
				next(err)
			})
	}
}

module.exports = TodoController