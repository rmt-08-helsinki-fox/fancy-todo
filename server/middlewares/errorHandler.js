function errorHandler (err, req, res, next)  {
    if (err.errors){
        let errors = []
        err.errors.forEach(element => {
          errors.push(element.message)
        });
        res.status(400).json({message:errors})
      } else if (err.name == "bad request" || err.message == "Request failed with status code 400") {
          if (err.message == "Request failed with status code 400") {
                let errors = []
                errors.push("location cannot be empty")
                res.status(400).json({message:errors})
          } else {
              let errors = []
              errors.push(err.message)
              res.status(400).json({message:errors})
          }
      } else if (err.name =="not found") {
        let errors = []
        errors.push(err.message)
        res.status(404).json({message:errors})
      } else if (err.name == "invalid token") {
        let errors = []
        errors.push(err.message)
        res.status(401).json({message:errors})
      } else if (err.name == "not authorized") {
        let errors = []
        errors.push(err.message)
        res.status(401).json({message:errors})
      } 
      else {
        res.status(500).json(err)
      }
}

module.exports = errorHandler