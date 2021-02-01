const router = require('express').Router()
const todosController = require('../controllers/todosController')


router.get('/', (req, res) => {
    res.send('hello world')
})
router.get('/add', todosController.add)
module.exports = router