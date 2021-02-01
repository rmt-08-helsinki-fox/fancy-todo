const router = require('express').Router();
const user = require('./user.js')
const todo = require('./todo.js')

router.use('/user', user);
router.use('/todos', todo);


module.exports = router;