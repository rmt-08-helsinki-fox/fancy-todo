const express = require("express")
const router = express.Router()

const todo = require('./todoRouter')

router.use('/todos', todo)

module.exports = router;
