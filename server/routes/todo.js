const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorize')

// READ BOOK FROM OPEN LIBRARY -- 3rd PARTY API
router.get('/searchBook', TodoController.searchBook)

router.use(authenticate)
// POST TODOS
router.post('/', TodoController.addTodos) // user authentication
// GET TODOS
router.get('/', TodoController.getTodos) // user authentication 

// authorize masih error , put sama patch masih kurang error handler misal datanya tidak di centang atau null
// GET TODOS BY ID
router.get('/:id', TodoController.getTodosById) // user authorize findOne(bersadararkan name)
// PUT TODOS BY ID - UPDATE ALL ROWS
router.put('/:id', TodoController.updateTodosAll) // user authorize
// PATCH TODOS BY ID - UPDATE SELECTED ROWS
router.patch('/:id', TodoController.updateTodosSelectedRows) // user authorize
// DELETE TODOS BY ID
router.delete('/:id', TodoController.deleteTodos) // user authorize


module.exports = router