const router = require('express').Router();
const todos = require('./todosRouter');
const user = require('./userRouter');
const Controller = require('../controllers');

router.get('/', Controller.main);
router.use('/todos', todos);
router.use('/user', user);

module.exports = router;