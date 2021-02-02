const Authentication = (req, res, next) => {
    console.log('Authentication succeed')
    next()
}

module.exports={
    Authentication
}