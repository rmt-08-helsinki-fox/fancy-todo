const express = require('express');
const router = express.Router();
const Controller = require('../controller/controller.js');

router.post('/', Controller.postTodo);
router.get('/', Controller.getTodo);
router.get('/:id', Controller.findById);
router.put('/:id', Controller.putTodo);
router.patch('/:id', Controller.patchTodo);
router.delete('/:id', Controller.deleteTodo);

module.exports = router