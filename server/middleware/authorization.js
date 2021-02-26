const { Todo, User } = require('../models/')

function authorization(req, res, next) {
  // disini bisa terima req.userData atau token yang di decode
  // ada req.params.id
  let user_id = +req.params.id
  console.log('ini dari authorization', user_id)
  Todo.findAll ({
    where: {
      "user_id": user_id  
    }
  })
  .then(todo => {
    req.todo = todo
    // error todo tidak ditemukan pindah di authorized
    if(!todo) throw ({ name:'customError', message: 'error not found', })
    //proses authorization
    if(todo) {
      console.log('lewat authorization')
      next()
    }
    else {
      // error ketika tidak diauthorized
      // res.status(401).json({ message: 'Not Authorized'})
      throw ({ name:'Authorization', message: 'Not Authorized', })
    }
  })
  .catch(err => {
    //error not found dari line 16
    // res.status(404).json({ message: err.message})
    next(err)
  })
}

module.exports = authorization