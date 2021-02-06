const errorHandlers = (err, req, res, next) => {
    if (err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError"){
        const message = err.errors[0].message
        return res.status(400).json({ message })
    }else if (err.name === "customError"){
        return res.status(err.code).json({
            message: err.msg
        })
    }else {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports = errorHandlers