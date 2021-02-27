const express = require('express');
const TodoController = require('../controllers/todo');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.use(authenticate);

router.post('/', TodoController.create);
router.get('/', TodoController.list);

router.get('/:id', authorize, TodoController.todoById);
router.put('/:id', authorize, TodoController.updatePut);
router.patch('/:id', authorize, TodoController.updatePatch);
router.delete('/:id', authorize, TodoController.delete);


module.exports = router