const router = require('express').Router();
const { authentication, authorize } = require('../middlewares');
const TodoController = require('../controllers/todoController');

router.use(authentication);

router.get('/', TodoController.read);
router.post('/', TodoController.create);

router.use(authorize);

router.get('/:id', TodoController.filterId);
router.put('/:id', TodoController.update);
router.patch('/:id', TodoController.updateStatus);
router.delete('/:id', TodoController.delete);

module.exports = router;