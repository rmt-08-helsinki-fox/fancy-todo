const express = require('express');
const router = express.Router();
const Controller = require('../controller/TodoController.js');
const authentication = require('../midlewares/authentication.js');
const authorize = require('../midlewares/authorize.js');

router.use(authentication)
router.post('/', Controller.postTodo);
router.get('/', Controller.getTodo);
router.get('/:id',authorize, Controller.findById);
router.put('/:id', authorize, Controller.putTodo);
router.patch('/:id',authorize, Controller.patchTodo);
router.delete('/:id',authorize, Controller.deleteTodo);

module.exports = router