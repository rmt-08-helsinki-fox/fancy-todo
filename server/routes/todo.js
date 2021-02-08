const route = require('express').Router({ mergeParams: true });
const TodoController = require('../controllers/TodoController')
const Gate = require('../middleware/policy');

route.get('/',TodoController.index);
route.post('/',TodoController.create);

route.get('/:id',Gate.todoResource,TodoController.detail);
route.put('/:id',Gate.todoResource,TodoController.update);
route.patch('/:id',Gate.todoResource,TodoController.updateStatus);
route.delete('/:id',Gate.todoResource,TodoController.destroy);


module.exports = route
