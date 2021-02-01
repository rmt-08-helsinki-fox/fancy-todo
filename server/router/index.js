const express = require('express')
const {Auth} = require('../Auth')
const {Controller} = require('../controllers')

const router = express.Router()

router.post('/todos', Controller.addTodo)
router.get('/todos', Controller.read)
router.get('/todos/:id', Controller.readById)
router.put('/todos/:id', Controller.editWhole)
router.patch('/todos/:id', Controller.edit)
router.delete('/todos/:id', Controller.delete)


module.exports={
    router
}