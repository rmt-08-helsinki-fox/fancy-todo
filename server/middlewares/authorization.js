const { Todo } = require("../models/")

//kalau UserId = req.dataUser.id boleh next
const authorized = (req, res, next) => {
  let idTodo = +req.params.id

  Todo.findOne({
    where: {
      id: idTodo
    }
  })
  .then(data => {
    if(!data) throw ({name: "custom", msg: "ID Not Found", status: 404})
    if(data.UserId === req.dataUser.id){
      next()
    }else{
      const err = {name: "custom", msg: "Unauthorized", status: 403}
      next(err)
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = authorized