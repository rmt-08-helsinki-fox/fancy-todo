const { Todo, Member, User, TodoMember } = require('../models');
const { Op } = require('sequelize');

class TodoController {
    static async addTodo(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body;
            const newTodo = { title, description, status, due_date, user_id: req.decoded.id };
            const insertTodo = await Todo.create(newTodo);

            const msg = {
                message: 'Success',
                data: insertTodo,
                response: true
            }
            res.status(201).json(msg);
        } catch (err) {
            next(err);
        }
    }

    static async showAllTodos(req, res, next) {
        try {
            const opt = {
                where: {
                    user_id: req.decoded.id
                },
                order: [['due_date', 'ASC']]
            }
            let todos = await Todo.findAll(opt);
            let isTodoMember = false;
            const member = await Member.findOne({
                where: {
                    email: req.decoded.email
                },
                include: Todo
            });
            if (member) {
                member.Todos.forEach(e => {
                    isTodoMember = true;
                    todos.push(e);
                });
            }
            
            const msg = {
                message: 'Success',
                data: todos,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async showTodo(req, res, next) {
        try {
            const id = req.params.id;
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                }
            }
            let todo = await Todo.findOne(opt);
            if (!todo) {
                let isTodoMember = false;
                const member = await Member.findOne({
                    where: {
                        email: req.decoded.email
                    },
                    include: Todo
                });
                if (member) {
                    member.Todos.forEach(e => {
                        if (e.id == id) {
                            todo = e;
                            isTodoMember = true;
                        }
                    })
                }
                if (!isTodoMember) {
                    throw 404;
                }
            }
            const msg = {
                message: 'Success',
                data: todo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async updateTodo(req, res, next) {
        try {
            const id = req.params.id;
            const { title, description, due_date } = req.body;
            const dataUpdate = { title, description, due_date };
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                },
                returning: true
            }

            let todo = await Todo.update(dataUpdate, opt);
            if (todo[1].length === 0) {
                if (!req.member) {
                    throw 404;
                }
                todo = await Todo.update(dataUpdate, {
                    where: {
                        id,
                        user_id: req.member.user_id
                    },
                    returning: true
                });
            }
            const msg = {
                message: 'Success',
                data: todo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const id = req.params.id; // id sudah dilindungi middleware
            const { status } = req.body;

            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                },
                returning: true
            }

            let todo = await Todo.update({ status }, opt);
            if (todo[1].length === 0) {
                if (!req.member) { // member didapat dan dilindungi oleh middleware
                    throw 404;
                }
                todo = await Todo.update({ status }, {
                    where: {
                        id,
                        user_id: req.member.user_id //dilindungi middleware
                    },
                    returning: true
                });
            }
            const msg = {
                message: 'Success',
                data: todo[1][0],
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async showMembers(req, res, next) {
        try {
            const id = req.params.id; // id sudah dilindungi middleware
            const todo = await Todo.findOne({
                where: { id },
                include: Member
            });
            const msg = {
                message: 'Success',
                data: todo,
                response: false
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
    static async addMember(req, res, next) {
        try {
            const id = req.params.id; // id sudah dilindungi middleware
            const email = req.body.email;
            const user = await User.findOne({
                where: { email }
            });
            if (!user) throw 404;
            let member = await Member.findOne({
                where: { email }
            });
            if (!member) {
                member = await Member.create({ email });
            }
            const todoMember = await TodoMember.create({
                todo_id: id,
                member_id: member.id
            });
            res.status(201).json({
                message: 'Success',
                response: true
            });
        } catch (err) {
            next(err);
        }
    }
    static async destroy(req, res, next) {
        try {
            const id = req.params.id;
            const opt = {
                where: {
                    id,
                    user_id: req.decoded.id
                }
            }
            let todo = await Todo.destroy(opt);
            if (todo === 0) {
                if (!req.member) {
                    throw 404;
                }
                todo = await Todo.destroy({
                    where: {
                        id,
                        user_id: req.member.user_id
                    }
                });
            }
            const msg = {
                message: 'Success',
                data: todo,
                response: true
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TodoController;