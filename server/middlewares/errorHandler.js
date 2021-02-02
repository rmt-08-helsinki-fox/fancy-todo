const errorHandler = (err, req, res, next) => {
    if(err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
        console.log("masuk");
        const errors = err.errors.map(e => e.message)
        res.status(400).json({errors})
    } else if(err.name === 'custom') {
        res.status(401).json({Error: err.msg})
    } else {
        res.status(500).json({Error: err.message})
    }
}

module.exports = {errorHandler}