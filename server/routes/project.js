const route = require('express').Router({ mergeParams: true });
const ProjectController = require('../controllers/ProjectController')
const Gate = require('../middleware/policy');

route.get('/',ProjectController.index);
route.post('/',ProjectController.create);

route.get('/:id',Gate.ProjectResource,ProjectController.detail);
route.put('/:id',Gate.ProjectResource,ProjectController.update);
route.delete('/:id',Gate.ProjectResource,ProjectController.destroy);

route.post('/:id/invite',ProjectController.invite);

module.exports = route
