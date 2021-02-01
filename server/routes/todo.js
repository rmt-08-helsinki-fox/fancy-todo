const route = require('express').Router();
const TodoController = require('../controllers/TodoController')

route.get('/',TodoController.index);
route.post('/',TodoController.create);
route.get('/:id',TodoController.detail);
route.put('/:id',TodoController.update);
route.patch('/:id',TodoController.updateStatus);
route.delete('/:id',TodoController.destroy);

module.exports = route
