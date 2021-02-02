function authenticate(req, res, next) {
    req.decoded = { name: 'Dimitri'};
    next();
}

module.exports = authenticate;