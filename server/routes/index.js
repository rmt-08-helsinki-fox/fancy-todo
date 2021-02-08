const route = require('express').Router();
const authroute = require('./auth');
const todoroute = require('./todo');
const projectroute = require('./project');
const authentication = require('../middleware/authentication');
const TodoController = require('../controllers/TodoController')

route.use(authroute);

route.use('/todos',authentication,todoroute);
route.use('/projects',authentication,projectroute);

module.exports = route