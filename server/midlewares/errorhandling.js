module.exports = (err, req, res, next) => {
    console.log(err.name, '<<<<')
    if(err.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json(err.errors[0].message)
    }else if(err.name === 'SequelizeValidationError'){
        res.status(400).json(err.errors[0].message)
    }else if(err.name === 'login'){
        res.status(400).json({message : "invalid email or password"})
    }else if(err.name === 'jwt'){
        res.status(400).json({message : 'invalid token'})
    }else if(err.name === 'authorized'){
        res.status(400).json({message : 'youre not authorized'})
    }else if(err.name === 'TypeError'){
        res.status(404).json({message : "data not found"})
    }
}