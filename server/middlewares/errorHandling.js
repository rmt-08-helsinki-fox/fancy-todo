const errorHandling = (err ,req, res, next) => {
  let {status, msg, errors, name} = err
  
  switch(name) {
    case "SequelizeUniqueConstraintError" :
    case "SequelizeValidationError" :
      if (errors) {
        let messages = []
        errors.forEach(error => {
          messages.push(error.message)
        });
        res.status(400).json({ message: messages})
      }
      break;
    case "Unauthorize" :
      res.status(401).json({message: !msg ? ["User not Authorize"] : [msg] })
      break;
    case "ResourceNotFound" :
      res.status(404).json({ message: ["Data Not Found"]})
      break;
    default: 
    res.status(500).json({ message: ["Internal Server Error"]})
  }
}

module.exports = errorHandling