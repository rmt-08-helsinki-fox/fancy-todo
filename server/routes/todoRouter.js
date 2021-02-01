// const express = require('express')
const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.post('/', TodoController.addTodo)
router.get('/', TodoController.getAll)

router.get('/:id', TodoController.getById)
router.put('/:id', TodoController.editPutById)
router.patch('/:id', TodoController.editPatchById)
router.delete('/:id', TodoController.destroy)


module.exports = router