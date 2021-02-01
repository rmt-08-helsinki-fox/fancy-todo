const router = require('express').Router()
const todos = require('./todo-routes')



router.get('/', (req, res) => {
  res.send('masuk index')
})

router.use('/todos', todos)



module.exports = router