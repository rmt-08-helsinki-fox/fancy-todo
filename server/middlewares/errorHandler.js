module.exports = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        let errorMessage = []
        err.errors.forEach(elm => {
            errorMessage.push(elm.message)
        })
        res.status(400).json({ error: errorMessage })
    } else if (err.name === 'CustomError') {
        res.status(err.status).json({ error: err.msg })
    } else {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
} 