const errorHandling = (err ,req, res, next) => {
  let {status, msg, errors} = err
  switch(status) {
    case 400 :
      if (errors) {
        let messages = []
        errors.forEach(error => {
          messages.push(error.message)
        });
        res.status(400).json({ message: messages})
      }
      break;
    case 401 :
      res.status(401).json({message: !msg ? "User not Authorize" : msg })
      break;
    case 404 :
      res.status(404).json({ message: "Data Not Found"})
      break;
    default: 
    res.status(500).json({ message: "Internal Server Error"})
  }
}

module.exports = errorHandling