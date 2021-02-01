const router = require('express').Router();
const todoRoutes = require('./todoRoutes');

router.use(todoRoutes);

module.exports = router;