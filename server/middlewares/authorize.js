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
      let err = {
        name: 'CustomError',
        error: 'Not authorized!',
        status: 401
      }
      next(err);
    }

  } catch (err) {
    next(err);
  }

}

module.exports = {
  authorize
}