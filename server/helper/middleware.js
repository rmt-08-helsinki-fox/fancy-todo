const { generateToken, verifyToken } = require('./jwt');

const mid = (req, res, next) => {
    const token = req.headers.token;
    const verify = verifyToken(token, process.env.SECRET);
    if (verify) {
        req.decoded = verify;
        next();
    } else {
        res.status(400).json('Invalid token');
    }
}

module.exports = mid;