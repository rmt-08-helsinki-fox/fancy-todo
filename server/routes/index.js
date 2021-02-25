const router = require('express').Router()
const todosRoute = require('./todosRoute')
const userRegRoute = require('./userRegRoute')
const userLogRoute = require('./userLogRoute')
const thirdPartyApi = require('./thirdPartyApi')
const google = require('./google')
router.get ('/', (req,res)=>{
    res.send('Hello')
})

router.use('/register',userRegRoute)
router.use('/login',userLogRoute)
router.use('/googleLogIn',google)
router.use('/todos',todosRoute)
router.use('/weather',thirdPartyApi)



module.exports = router