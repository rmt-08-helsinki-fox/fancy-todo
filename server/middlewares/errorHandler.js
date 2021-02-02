const e = require("express")

const errorHandler = (err, req, res, next) => {

    console.log(err)

    if(err.name == 'SequelizeValidationError'){
        res.status(400).json( { message: "validation errors" } )
    } else if (err.name == 'customError') {
        res.status(err.status).json( { message: err.message } )
    } else if (err.name == 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map(element => element.message)
        res.status(400).json( { message: errors } )
    } else {
        res.status(500).json({ message: "Internal Server Error"})
    }

}

module.exports = errorHandler