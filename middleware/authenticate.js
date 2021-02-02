const jwt = require('jsonwebtoken')

const authenticate = function(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.SECRET);

    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid token',
    })
  }
}

model.exports = authenticate;
