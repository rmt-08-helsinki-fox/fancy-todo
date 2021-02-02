const errorHandling = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        const validates = err.errors.map(e => e.message);
        const msg = {
            message: validates,
            response: false
        }
        res.status(400).json(msg);
    } else if (err === 404) {
        const msg = {
            message: 'Data not found',
            response: false
        }
        res.status(404).json(msg);
    } else {
        res.status(500).json(err);
    }
}

module.exports = errorHandling;