let { Todo, Project } = require('../models')

class Gate{

    static todoResource = async(req,res,next) => {
        try {
            let todo = await Todo.findByPk(+req.params.id);
            if(!todo)
                throw {msg : "Not Found", statusCode : 404, name : 'custom'}
            else if(todo.UserId != req.user.id){
                throw {msg : "Unauthorized action", statusCode : 401, name : 'custom'}
            }
            next();
        } catch (error) {
            next(error);
        }
    }

    static ProjectResource = async(req,res,next) => {
        try {
            let project = await Project.findByPk(+req.params.id);
            if(!project)
                throw {msg : "Not Found", statusCode : 404, name : 'custom'}
            else if(project.UserId != req.user.id){
                throw {msg : "Unauthorized action", statusCode : 401, name : 'custom'}
            }
            next();
        } catch (error) {
            next(error);
        }
    }

}

module.exports = Gate