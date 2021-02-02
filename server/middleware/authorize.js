const authorize = function (req, res, next) {
    if (req.decoded.role === 'admin') {
        next()
    }else{
        res.status(401).json({
            msg:'Not admin'
        })
    }
}

module.exports = { authorize }