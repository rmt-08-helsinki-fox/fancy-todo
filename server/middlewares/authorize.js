const TodoController = require("../controller/todoController");

function authorize(req, res, next) {
  // req.decoded === { id, email, iat }
  let idTodo = +req.params.id;
  let currUserId = +req.decoded.id;

  TodoController.findByPk(idTodo)
    .then((todo) => {
      if (!todo) {
        throw {
          name: "customError",
          msg: "Error not found",
          status: 404
        };
      }
      if (todo.UserId === currUserId) {
        next();
      } else {
        throw {
          name: "customError",
          msg: "Not authorized",
          status: 401
        };
        // res.status(401).json({ message: "not authorized" });
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = authorize;
