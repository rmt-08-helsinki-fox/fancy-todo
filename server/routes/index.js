const route = require('express').Router();
const authroute = require('./auth');
const todoroute = require('./todo');

route.use(authroute);
route.use('/todos',todoroute);


module.exports = route