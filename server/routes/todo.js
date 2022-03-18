const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const WeatherController = require('../controllers/weatherController')
const { authorized } = require('../middlewares/auth')

router.get('/weather', WeatherController.showWeather)
router.post('/', TodoController.create)
router.get('/', TodoController.showAll)
router.get('/:id', authorized, TodoController.getOne)
router.put('/:id', authorized,TodoController.putTodo)
router.patch('/:id', authorized, TodoController.patchTodo)
router.delete('/:id', authorized, TodoController.delete)

module.exports = router