const { checkToken } = require('../helpers/jwt')
const { Todo } = require('../models/index')

async function authenticate(req, res, next){
  try {
    console.log('masuk authenticate')
    let token = req.headers.access_token
    let payload = checkToken(token)
    if(!payload){
      res.status(404).json({msg: 'Invalid Token'})
    }
    req.user = payload
    next()
  } catch (err) {
    console.log(err, 'ini dalem catch')
    res.status(500).json(err.message)
  }
}

async function authorization(req, res, next){
  try {
    console.log('masuk authorization')
    let todo = await Todo.findOne({
      where: {id: req.params.id}
    })
    if(!todo){
      throw({
        name: 'DataNotFound',
        status: 404,
        msg: 'Data Not Found'
      })
    }
    else if(todo.user_id !== req.user.id){
      res.status(401).json({msg : 'Unauthorized'})
    } else {
      next()
    }

  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = { 
  authenticate,
  authorization
}