const router = require('express').Router();
const todos = require('./r_todos');
const Controller = require('../controllers');

router.get('/', Controller.main);
router.use('/todos', todos);

module.exports = router;