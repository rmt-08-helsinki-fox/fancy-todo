const router = require('express').Router();
const todoRoutes = require('./todoRoutes');
const authRoutes = require('./authRoutes');
const quotesRoutes = require('./quotesRoutes');

router.use('/todos', todoRoutes);
router.use('/auth', authRoutes);
router.use('/quotes', quotesRoutes);

module.exports = router;