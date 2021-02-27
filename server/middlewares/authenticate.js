const { verifyToken } = require('../helpers/jwt');


const authenticate = (req, res, next) => {
  try {

    const token = req.headers.token;
    const decoded = verifyToken(token);
    console.log(decoded);

    req.decoded = decoded;
    
    next();
  } catch (err) {
    console.log('==================');
    console.log(err, 'eror di file authenticate');
    // res.status(401).json({
    //   error: 'Invalid Token'
    // })
    next(err)
  }
}

module.exports = authenticate;