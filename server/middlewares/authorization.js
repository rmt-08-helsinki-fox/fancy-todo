const authorization = (req, res, next) => {
    console.log(req.decoded);
    next()
}

module.exports = {authorization}