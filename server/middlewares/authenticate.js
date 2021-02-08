const { checkToken } = require("../helper/jwt");
const { Todo } = require("../models/");

function authentication(req, res, next) {
  try {
    let decoded = checkToken(req.headers.access_token);
    if (!decoded) {
      next({ name: "Login first" });
    } else {
      req.user = decoded;
      next();
    }
  } catch (err) {
    next({ name: "Login first" });
  }
}

function authorization(req, res, next) {
  let idUser = req.user.id;
  let idTodo = req.params.id;
  Todo.findByPk(idTodo)
    .then((data) => {
      if (!data) {
        next({ name: "Not Found" });
      } else if (data.UserId !== idUser) {
        next({ name: "Unautorized" });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  authentication,
  authorization,
};
