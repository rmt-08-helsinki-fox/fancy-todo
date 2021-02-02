
function authorize (req, res, next) {
    if (req.decoded.email ==='dimitril@mail') {
        next();
    } else {
        res.status(401).json({message: 'not authorized'})
    }
}

module.exports = authorize;