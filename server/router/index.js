const router = require('express').Router();
const todo = require('./todo.js');
const user = require('./user.js');
const authenticate = require('../middlewares/authentication.js');
const errorHandler = require('../middlewares/errorHandler.js');

router.use('/', user);

router.use('/todos', authenticate, todo);

router.use(errorHandler);

module.exports = router;