module.exports = (err,req,res,next) => {
    switch (err.name) {
        case 'SequelizeUniqueConstraintError':
        res.status(400).json({msg:'Email must Be Unique'})
        break;
        case 'SequelizeValidationError':
        const errors = err.errors.map(el => el.message)
        res.status(400).json({errors})
        break;
        case 'dataNothing':
        res.status(404).json({msg: err.msg})
        break;
        case 'userNotFound':
        res.status(404).json({msg: err.msg})
        break;
        case 'passError':
        res.status(400).json({msg: err.msg})
        break;
        case 'TokenInvalid':
        res.status(400).json({msg: 'Invalid Token'})
        break;
        case 'AuthorizedFail':
        res.status(401).json({msg: err.msg})
        break;
        default:
            res.status(500).json({ msg: "Internal Server Error" })
            break;
    }
}