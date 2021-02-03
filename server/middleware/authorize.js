const {Todo, User} = require('../models')

const authorizeTodo = function(req, res, next) {
  let id = req.params.id;
  let decodeId = req.decode.id
  // console.log('masuk authorize');
  // console.log(id, 'id');
  Todo.findOne({
    where: {
      id: id
    }
  }).then(function(data) {
    // console.log(data,'data');
    if (!data) {
      next({
        stat: 404,
        message: 'Data not found'
      })
    } else if (data.user_id === decodeId) {
      next()
    } else if (data.user_id !== decodeId) {
      next({
        stat: 401,
        message: 'Not authorize'
      })
    }
  }).catch(function(err) {
    res.status(500).json(err)
  })
}

module.exports = authorizeTodo