const authorizeByRole = function(req, res, next){
    //req.decoded = { id, email, iat, dst}
    if(req.decoded.role === 'user' && req.decoded.id === +req.params.id){
        next()
    } else{
        res.status(401).json({
            message: 'Not Authorized'
        })
    }
}

module.exports = authorizeByRole