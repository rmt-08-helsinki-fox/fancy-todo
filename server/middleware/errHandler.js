function errHandler(err, req, res, next) {
  if (err.message === 'Not authorize') {
    res.status(401).json(err.message)
  } else if (err.message === 'Data not found') {
    res.status(404).json(err.message)
  } else if (err.errors[0].type === 'Validation error') {
    res.status(400).json(err)
  } else {
    res.status(500).json(err)
  }
}

module.exports = errHandler