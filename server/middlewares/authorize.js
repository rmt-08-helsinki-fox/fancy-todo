const { Todo } = require('../models/index');

const authorize = async function (req, res, next) {

  const list = await Todo.findByPk(+req.params.id);

  try {

    if (!list) throw {
      name: 'CustomError',
      error: "ID not found!",
      status: 404
    };

    if (+req.decoded.id === +list.UserId) {
      next();
    } else {
      res.status(401).json({
        error: 'Not authorized!'
      });
    }

  } catch (err) {

    next(err);

  }

}

module.exports = {
  authorize
}