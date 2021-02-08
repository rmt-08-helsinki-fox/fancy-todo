module.exports = (err,req,res,next) => {
  if(err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError'){
    const errors = err.errors.map(el => el.message)
    res.status(400).json({
      message: errors
    })
  }else if(err.name == 'customError'){
    res.status(err.status).json({
      message: err.msg
    })
  }else{
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}