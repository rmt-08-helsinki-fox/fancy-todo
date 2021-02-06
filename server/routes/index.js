const route = require('express').Router();
const authroute = require('./auth');
const todoroute = require('./todo');
const authentication = require('../middleware/authentication');
const TodoController = require('../controllers/TodoController')

route.use(authroute);
route.use('/todos',authentication,todoroute);

module.exports = route