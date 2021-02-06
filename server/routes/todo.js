const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorize')



router.use(authenticate)
// POST TODOS
router.post('/', TodoController.addTodos) // user authentication
// GET TODOS
router.get('/', TodoController.getTodos) // user authentication 
// READ PROJECT FROM api.creativecommons. -- 3rd PARTY API
router.get('/projectList/', TodoController.projectList)
// add project
router.post('/addProject', TodoController.addProject)
// saved project List
router.get('/userProjectList', TodoController.userProjectList)
// delete project
router.delete('/deleteProjectUser/:id', TodoController.deleteProjectUser)
// // invite user to project
// router.get('/inviteUser', TodoController.inviteUser)

// GET TODOS BY ID
router.get('/:id', authorize, TodoController.getTodosById) // user authorize findOne(bersadararkan name)
// PUT TODOS BY ID - UPDATE ALL ROWS
router.put('/:id', authorize, TodoController.updateTodosAll) // user authorize
// PATCH TODOS BY ID - UPDATE SELECTED ROWS
router.patch('/:id', authorize, TodoController.updateTodosSelectedRows) // user authorize
// DELETE TODOS BY ID
router.delete('/:id', authorize, TodoController.deleteTodos) // user authorize



module.exports = router