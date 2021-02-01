const router = require('express').Router();
const todoRoutes = require('./todoRoutes');
const authRoutes = require('./authRoutes');

router.use(todoRoutes);
router.use(authRoutes);

module.exports = router;