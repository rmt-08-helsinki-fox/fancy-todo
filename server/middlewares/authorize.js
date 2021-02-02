const { Todo } = require('../models');

const authorize = (req,res,next) => {
  const id = +req.params.id
  Todo
    .findOne({
      where:{
        id
      }
    })
    .then(todo => {
      if (!todo) throw { msg: `there is no todo with id: ${id}` }
      if (+req.decoded.id === todo.UserId) {
        next()
      } else {
        res.status(401).json({
          msg: 'Not authorized'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
}

module.exports = authorize