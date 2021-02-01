const express = require('express');
const router = express.Router();
const toDosRouter = require('./todos');

router.use('/todos', toDosRouter);

module.exports = router;