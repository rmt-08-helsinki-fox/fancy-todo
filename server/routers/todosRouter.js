const router = require('express').Router();
const TodosController = require('../controllers/todosController');

router.get('/', TodosController.read);

router.post('/', TodosController.create);

router.get('/:id', TodosController.filter_id);

router.put('/:id', TodosController.update);

router.patch('/:id', TodosController.update_status)

router.delete('/:id', TodosController.delete);

module.exports = router;