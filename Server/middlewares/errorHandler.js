function errorHandler (err, req, res, next) {
    if(err.name === "customError"){
        res.status(err.status).json({message: err.message})
    }else if(err.name === "SequelizeValidationError"){
        let errors = err.errors.map(el => el.message)
        res.status(400).json({message: errors})
    }else if(err.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json({Message: err.errors[0].message})
    }else{
        res.status(500).json({Message: 'Internal Server Error'})
    }
}

module.exports = errorHandler