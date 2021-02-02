const { generateToken, verifyToken } = require('./jwt');

const mid = (req, res, next) => {
    const token = req.headers.token;
    const verify = verifyToken(token, process.env.SECRET);
    if (verify) {
        req.decoded = verify;
        next();
    } else {
        const msg = {
            message: 'Invalid token',
            response: false
        }
        res.status(401).json(msg);
    }
}

module.exports = mid;