module.exports = (err, req, res, next) => {
  console.log(err , `<<<<<<< ini dari error handler`)
  console.log(err.name , `<<<<<<< ini dari error handler`)
  if (err.name == 'SequelizeValidationError') {
    const error = err.errors.map(element => element.message)
    res.status(400).json({error})
  } else if (err.name == 'ReferenceError') {
    res.status(500).json({ error: [`Internal server errors`] })
  } else if (err.name == undefined) {
    res.status(404).json({ error: [`error not found`] })
  } else if (err.name == `TypeError`) {
    res.status(400).json(err)
  } else if (err.name == `SequelizeUniqueConstraintError`) {
    const error = err.errors.map(element => element.message)
    res.status(400).json({ error })
  }
}