const { ToDo } = require('../models')

const authorize = async (req, res, next) => {
  try {
    const { id } = req.params
    const UserId = req.decoded.id

    const data = await ToDo.findOne({
      where: { id }
    })

    if(!data) throw ({
      status: 404,
      error: "id not found"
    })

    if(data.UserId !== UserId) throw {
      status: 401,
      error: "not authorized"
    }

    next()
  } 
  catch (error) {
    if(error.status === 404) {
      res.status(404).json(error)
    } else if (error.status === 401) {
      res.status(401).json(error)
    } else {
      res.status(500).json({})
    }
  }
}

module.exports = authorize