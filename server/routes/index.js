const router = require('express').Router()
const todos = require('./todo-routes')
const users = require('./user-routes')



router.get('/', (req, res) => {
  res.send('masuk index')
})

router.use('/todos', todos)
router.use('/users', users)



module.exports = router