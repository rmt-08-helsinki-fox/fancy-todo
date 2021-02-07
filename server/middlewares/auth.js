const { decoded } = require('../helpers/jwt')
const { User, Todo } = require('../models')


function authenticate(req, res, next) {
    try {
        let getToken = decoded(req.headers.access_token)
        // console.log(getToken.email);
        User.findOne({
            where: {
                email: getToken.email
            }
        })
        .then(data => {
            if(!data) res.status(401).json({msg: `User not authorized`})
            else {
              req.user = {
                id: data.id,
                email: data.email
              }
              next()
            }
        })
        .catch(err => next(err))
        // console.log(req.user);
    } catch(err) {
        res.status(400).json({msg: `Invalid Token`})
    }
}

function authorized(req, res, next) {
    const idTodo = +req.params.id
    const idUser = req.user.id
    Todo.findByPk(idTodo)
    .then(data => {
      // console.log(data);
      if(data) {
        if(data.UserId == idUser) {
          next()
        } else {
          next(res.status(401).json({msg: `User not authorized`}))
        }
      } else next(res.status(400).json({msg: `Data not found`}))
    })
    .catch(err => next(err))
}

module.exports = {
    authenticate,
    authorized
}