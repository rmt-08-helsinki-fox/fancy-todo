module.exports = (err, req, res, next) => {
    //log dulu
    // console.log(err);
    if (err.name == "SequelizeUniqueConstraintError") {
        const errors = err.errors.map(el => el.message)
        res.status(400).json({ errors })
    }
    // else if (err.name == 'customError') {
    //     res.status(err.status).json({ message: err.msg })
    // }
}