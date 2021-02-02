const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

router.use(authenticate);

router.get('/', todoController.getToDoList);
router.post('/', todoController.addToDoList);
router.get('/dictionary', todoController.getDictionary);
router.get('/:id', authorize, todoController.getToDoListIdParam);
router.put('/:id', authorize, todoController.updateToDoList);
router.patch('/:id', authorize, todoController.updateStatusToDoList);
router.delete('/:id', authorize, todoController.deleteToDoList);

module.exports = router;