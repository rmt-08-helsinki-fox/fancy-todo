// const express = require('express')
require('dotenv').config()
const router = require('express').Router()
const TodoController = require('../controllers/todoController')
// const jwt = require('jsonwebtoken')
const authentication = require('../middleware/authentication')
const authorizeTodo = require('../middleware/authorize')


router.use(authentication)

router.post('/', TodoController.addTodo)
router.get('/', TodoController.getAll)

router.get('/:id', authorizeTodo, TodoController.getById)
router.put('/:id', authorizeTodo, TodoController.editPutById)
router.patch('/:id', authorizeTodo, TodoController.editPatchById)
router.delete('/:id', authorizeTodo, TodoController.destroy)


module.exports = router