function errorHandler (err, req, res, next) {
    if (err) {
        switch(err.name) {
    
            case 'Invalid Token':
                res.status(400).json({ message: 'Invalid Email/Password'})
                break
            case 'Not Authorized':
                res.status(401).json({ message: `You don't have permission to perform this action`})
                break
            case 'Invalid Email':
                res.status(400).json({ message: 'Invalid Email Format'})
                break;
            default:
                res.status(500).json({ message: 'Internal Server Error'})
        }
    }
}

module.exports = errorHandler