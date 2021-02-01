const router = require('express').Router();
const todo = require('./todo.js');
const user = require('./user.js');

router.use('/todos', todo);

router.use('/', user);

module.exports = router;