function errHandler(err, req, res, next) {
  if (err.errors[0].type === 'Validation error') {
    res.status(400).json(err)
  } else {
    res.status(500).json(err)
  }
}

module.exports = errHandler