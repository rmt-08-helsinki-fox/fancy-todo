const router = require('express').Router();
const C_Todos = require('../controllers/c_todos');

router.get('/', C_Todos.read);

router.post('/add', C_Todos.create);

router.get('/:id', C_Todos.filter_id);


module.exports = router;