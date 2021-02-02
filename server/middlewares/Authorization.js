const Authorization = (req, res, next) => {
    console.log('Authorization succeed')
    next()
}


module.exports={
    Authorization
}