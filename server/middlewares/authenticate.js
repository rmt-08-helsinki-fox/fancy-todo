const { verifyToken } = require('../helpers/jwt');


const authenticate = (req, res, next) => {
  try {

    const token = req.headers.token;
    const decoded = verifyToken(token);
    console.log(decoded);

    req.decoded = decoded;
    
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: 'Invalid Token'
    })
  }
}

module.exports = authenticate;