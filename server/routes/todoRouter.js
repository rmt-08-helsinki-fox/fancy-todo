// const express = require('express')
require('dotenv').config()
const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const jwt = require('jsonwebtoken')
const authentication = require('../middleware/authentication')
const authorize = require('../middleware/authorize')


router.use(authentication)

router.post('/', TodoController.addTodo)
router.get('/', TodoController.getAll)

router.use(authorize)
router.get('/:id', TodoController.getById)
router.put('/:id', TodoController.editPutById)
router.patch('/:id', TodoController.editPatchById)
router.delete('/:id', TodoController.destroy)


module.exports = router