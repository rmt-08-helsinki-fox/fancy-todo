// module.exports = (err, req, res, next) => {
//log dulu
// console.log(err);
// if (err.name == "SequelizeUniqueConstraintError") {
//     const errors = err.errors.map(el => el.message)
//     res.status(400).json({ errors })
// }
// else if (err.name == 'customError') {
//     res.status(err.status).json({ message: err.msg })
// }
// }

module.exports = (err, req, res, next) => {
    let errorStatus = 500
    let errorLabel = "Unknown error"
    let message = "Internal server error"

    switch (true) {
        case (err.name === "SequelizeValidationError"):
            errorStatus = 400
            errorLabel = "Validation Error"
            message = err.errors.map(el => el.message)
            break;

        case (err.name === "SequelizeUniqueConstraintError"):
            errorStatus = 400
            errorLabel = "Invalid Email"
            message = err.errors.map(el => el.message)
            break;

        case (err.name === "customError"):
            errorStatus = 400
            errorLabel = "Invalid data"
            message = err.message
            break;
        case (err.name === "JsonWebTokenError"):
            errorStatus = 401
            errorLabel = "UNAUTHORIZED USER"
            message = err.message
            break;
        default:
            break;
    }

    res.status(errorStatus).json({
        error: errorLabel, message: message
    })
}