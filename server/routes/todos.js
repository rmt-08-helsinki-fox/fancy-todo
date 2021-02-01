const express = require('express');
const router = express.Router();
const Controller = require('../controller/controller');

router.get('/', Controller.getToDoList);
router.get('/:id', Controller.getToDoListIdParam);
router.post('/', Controller.addToDoList);
router.put('/:id', Controller.updateToDoList);
router.patch('/:id', Controller.updateStatusToDoList);
router.delete('/:id', Controller.deleteToDoList);

module.exports = router;