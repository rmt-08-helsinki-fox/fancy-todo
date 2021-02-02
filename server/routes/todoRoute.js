const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.post('/', TodoController.addTodo);
router.get('/', TodoController.getTodos);

router.get('/:id', authorization, TodoController.getTodoById);
router.put('/:id', authorization, TodoController.updateAllField);
router.patch('/:id', authorization, TodoController.updateStatusTask);
router.delete('/:id', authorization, TodoController.deleteTodo);

router.get('/:id/weather-info', authorization, TodoController.getForecastWeather);


module.exports = router;