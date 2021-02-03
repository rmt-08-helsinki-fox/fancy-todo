const { checkToken } = require('../helpers/jwt')
const { User, Todo } = require('../models/index')

class Auth {
  static authentication(req, res, next) {
    try {
      let decoded = checkToken(req.headers.access_token)

      User.findOne({
        where: {
          email: decoded.email
        }
      })
        .then(data => {
          if (!data) {
            throw ({ name: 'JsonWebTokenError', message: 'Please Login First' })
          }
          else {
            req.user = data
            next()
          }
        })
        .catch(err => {
          next(err)
        })
    } catch (err) {
      next({ name: 'JsonWebTokenError', message: 'Please Login First' })
    }
  }

  static authorization(req, res, next) {
    const id = +req.params.id
    const UserData = req.user.id

    // Todo.findByPk(id)
    //   .then(dataTodo => {
    //     if (!dataTodo) {
    //       throw({name: 'NotFoundError', message: 'Data Todo Not Found'})
    //     } else if (UserData !== dataTodo.UserId) {
    //       throw({name: 'Forbidden', message: 'You Dont Have to Access'})
    //     } else {
    //       next()
    //     }
    //   })
    //   .catch(err => {
    //     next(err)
    //   })

      Todo.findOne({where: {
        UserId: UserData
      }})
      .then(dataTodo => {
        if (!dataTodo) {
          throw({name: 'NotFoundError', message: 'Data Todo Not Found'})
        } else if (UserData !== dataTodo.UserId) {
          throw({name: 'Forbidden', message: 'You Dont Have to Access'})
        } else {
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Auth