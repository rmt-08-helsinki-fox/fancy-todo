const { Todo, User } = require('../models/')

function authorization(req, res, next) {
  // disini bisa terima req.userData atau token yang di decode
  // ada req.params.id
  
  let todoId = +req.params.id
  
  Todo.findByPk(todoId, {
    include: [User]
  })
  .then(todo => {
    
    req.todo = todo
    // error todo tidak ditemukan pindah di authorized
    if(!todo) throw new Error('error not found')
    //proses authorization
    if(req.todo.user_id === req.userData.id) {
      next()
    }
    else {
      // error ketika tidak diauthorized
      res.status(401).json({ message: 'Not Authorized'})
    }
  })
  .catch(err => {
    //error not found dari line 16
    res.status(404).json({ message: err.message})
  })
}

module.exports = authorization