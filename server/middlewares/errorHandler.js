module.exports = (error, req, res, next) => {

    let errorMessages = []
    let errorMessage = ''
    let errorCode = null
    
    switch (error.name) {
        case 'JsonWebTokenError':
            res.status(401).json({
                error: {
                    code: 401,
                    message: error.message
                }
            })
            break
        case 'Custom error':
            errorCode = error.error.code
            errorMessage = error.error.message
            res.status(errorCode).json({
                error: {
                    code: errorCode,
                    message: errorMessage
                }
            })
            break
        case 'SequelizeUniqueConstraintError':
            errorMessages = error.errors.map(e => {
                return e.message
            })
            res.status(400).json({
                error: {
                    code: 400,
                    messages: errorMessages
                }
            })
            break
        case 'SequelizeValidationError':
            errorMessages = error.errors.map(e => {
                return e.message
            })
            res.status(400).json({
                error: {
                    code: 400,
                    messages: errorMessages
                }
            })
            break
        default:
            res.status(500).json({
                error: {
                    code: 500,
                    messages: 'internal server error'
                }
            })
            break
    }

}