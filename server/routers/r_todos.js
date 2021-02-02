const router = require('express').Router();
const C_Todos = require('../controllers/c_todos');

router.get('/', C_Todos.read);

router.post('/', C_Todos.create);

router.get('/:id', C_Todos.filter_id);

router.put('/:id', C_Todos.update);

router.patch('/id', C_Todos.update_status)

router.delete('id', C_Todos.delete);


module.exports = router;