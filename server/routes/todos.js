const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

router.get('/', todoController.getToDoList);
router.get('/:id', todoController.getToDoListIdParam);
router.post('/', todoController.addToDoList);
router.put('/:id', todoController.updateToDoList);
router.patch('/:id', todoController.updateStatusToDoList);
router.delete('/:id', todoController.deleteToDoList);

module.exports = router;