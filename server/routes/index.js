const router = require('express').Router();
const todoRoutes = require('./todoRoutes');
const authRoutes = require('./authRoutes');

router.use('/todos', todoRoutes);
router.use('/auth', authRoutes);

module.exports = router;