const router = require('express').Router () 
const todosRouter = require('./todoRouter')
const userRouter = require ('./userRouter') 
const weatherRouter = require ('./weatherRouter')
const authentication = require ('../middlewares/authentication')

router.use('/user',userRouter)
router.use(authentication)
router.use ('/todos', todosRouter) 
router.use('/weather',weatherRouter) 


module.exports = router