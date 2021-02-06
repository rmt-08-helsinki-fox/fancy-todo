const errorHandler = (err, req, res, next) => {
  console.log(err, "<<< error handler");
  console.log(err.name, "<<< error name handler");
  console.log(err.status, "<<< error status");
  console.log(err.msg, "<<< error msg");
  console.log(err.errors, "<<< errors");
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(el => el.message)
    res.status(400).json({ errors : errors })
  } else if (err.name === 'Error400' || err.name === 'Error401' || err.name === 'Error403' || err.name === 'Error404'){
    res.status(err.status).json({ errors: err.msg })
  } else {
    const errors = err.msg || 'Internal Server Error'
    const status = err.status || 500
    res.status(status).json({ errors })
  }

  // console.log(errors);
  // switch (err.name) {
  //   case 'SequelizeValidationError':
  //     // var errors = err.errors.map(el => el.message)
  //     res.status(400).json({ errors : error = err.errors.map(el => el.message) })
  //     break;
  //     case 'SequelizeUniqueConstraintError':
  //     res.status(400).json({ errors : error = err.errors.map(el => el.message) })
  //     break;
  //   case 'Error400':
  //     res.status(err.status).json({ errors : err.msg })
  //     break;
  //   case 'Error401':
  //     res.status(err.status).json({ errors : err.msg })
  //     break;
  //   case 'Error403':
  //     res.status(err.status).json({ errors : err.msg })
  //     break;
  //   case 'Error404':
  //     res.status(err.status).json({ errors : err.msg })
  //     break;
  //   default:
  //     res.status(500).json({ errors : 'Internal Server Error' })
  //     break;
  // }
}

module.exports = errorHandler