const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'SequelizeValidationError':
            const errorMessage = err.errors.map((error) => error.message)
            res.status(400).json({ errors: errorMessage })
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ errors: 'Email already in use' })
            break;
        case 'Not Found Error':
            res.status(404).json({ errors: err.message })
            break;
        case 'Forbidden':
            res.status(403).json({ errors: err.message })
            break;
        case 'data not found':
            console.log(err);
            res.status(404).json({ errors: err.message })
            break;
        case 'error login':
            res.status(400).json({ errors: err.message })
            break;
        default:
            console.log(err);
            res.status(500).json({ errors: 'Internal Server Error' })
            break;
    }
};

module.exports = errorHandler