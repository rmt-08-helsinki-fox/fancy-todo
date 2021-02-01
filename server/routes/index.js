const router = require('express').Router()
const todosRoute = require('./todosRoute')
const authRegRoute = require('./authRegRoute')

router.get ('/', (req,res)=>{
    res.send('Hello')
})

router.use('/todos',todosRoute)
router.use('/register',authRegRoute)




module.exports = router