const { Todo } = require('../models/index');

const authorize = async function (req, res, next) {
  const list = await Todo.findByPk(+req.params.id);
  if (+req.decoded.id === +list.UserId) {
    next();
  } else {
    res.status(401).json({
      message: 'Not authorized!'
    });
  }
}

module.exports = {
  authorize
}