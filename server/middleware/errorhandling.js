function errorHandling(err, req, res, next) {
    if(err) {
    
        if(err.name === "SequelizeValidationError"||err.name === 'SequelizeUniqueConstrainError') {
            let errors = err.errors.map(el => {
                return {
                    message: el.message
                }
            })
            res.status(400).json(errors)
        } else if(err.name === "notFound") {
            console.log('Error not found')
            res.status(404).json({message: "Errors not found"})
        } else if(err.name === "invalid") {
            console.log('Invalid email/password')
            res.status(400).json({message: "Invalid email/password"})
        } else if(err.name === "Not Authenticated") {
            console.log('Please login first')
            res.status(400).json({message: "Please login first"})
        } else if(err.name === "Not Authorized") {
            console.log('Not Authorized')
            res.status(403).json({message: "No Authorization"})
        } else {
            console.log(err, "error di 500")
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = errorHandling;
