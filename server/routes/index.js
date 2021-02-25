const express = require('express')
const router = express.Router()
const TodoRouter = require('./todoRoute')
const UserRouter = require('./UserTodo')
const {authentication} = require('../middleware/authz')


router.use('/users',UserRouter)


router.use(authentication)
router.use('/todos',TodoRouter)









module.exports= router