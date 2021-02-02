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
    if(data.UserId === req.dataUser.id){
      next()
    }else{
      res.status(401).json({msg: "Unauthorized"})
    }
  })
  .catch(err => {
    res.status(500).json({msg: "Internal Server Error"})
  })
}

module.exports = authorized