// const express = require('express')
// const router = express.Router()
const router = require('express').Router()
const todosRouter = require('./todoRouter')


router.use('/todos', todosRouter)


module.exports = router