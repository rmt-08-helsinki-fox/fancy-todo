
function errorHandler (err, req, res, next) {
  let errName = err.name
  let errMsg = err.message

  switch (errName) {
    case 404:
      res.status(404).json({ error: errMsg})
      break;
    case 401:
      res.status(401).json({ error: 'unauthorize' })
      break;
    case 403:
      escape.status(403).json({ error: 'forbidden' })
      break;
    case 400:
      res.status(400).json({ error: 'bad request' })
      break;
    case 'SequelizeValidationError':
      console.log(errMsg.split('\n'))
      res.status(400).json(errMsg.split(',\n'))
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: errMsg})
    default:
      res.status(500).json({ error: errMsg })
      console.log(err.message)
  }
}

module.exports = errorHandler