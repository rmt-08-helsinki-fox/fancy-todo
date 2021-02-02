const { ToDo } = require('../models/');

function authorize (req, res, next) {
    ToDo.findByPk(req.params.id)
    .then(todo => {
        req.todo = todo;
        if (!todo) throw ({name: "customErr",msg: 'error not found', status: 404});
        if(todo.user_id === req.decoded.id){
            next();
        } else {
            throw ({name: "customErr",msg: "Not authorized", status: 401});
        }
    })
    .catch(err => next(err));
}

module.exports = authorize;