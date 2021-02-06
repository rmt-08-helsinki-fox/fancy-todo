const router = require('express').Router()
const todosRoute = require('./todosRoute')
const userRegRoute = require('./userRegRoute')
const userLogRoute = require('./userLogRoute')
const thirdPartyApi = require('./thirdPartyApi')
const google = require('./google')
router.get ('/', (req,res)=>{
    res.send('Hello')
})

router.use('/todos',todosRoute)
router.use('/register',userRegRoute)
router.use('/login',userLogRoute)
router.use('/weather',thirdPartyApi)
router.use('/googleLogIn',google)



module.exports = router