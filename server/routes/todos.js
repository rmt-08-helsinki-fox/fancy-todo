const express = require('express');
const TodoController = require('../controllers/todo');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.use(authenticate);
router.use(authorize);

router.post('/', TodoController.create);
router.get('/', TodoController.list);

router.get('/:id', TodoController.todoById);
router.put('/:id', TodoController.updatePut);
router.patch('/:id', TodoController.updatePatch);
router.delete('/:id', TodoController.delete);


module.exports = router