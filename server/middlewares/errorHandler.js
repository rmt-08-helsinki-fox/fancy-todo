const errorHandler = (err, req, res,next) =>{
    if(err.name === 'SequelizeUniqueConstraintError'){
       return res.status(400).json({error: 'Email already exist'})
    } else if(err.name == "SequelizeValidationError"){
        const errors = err.errors.map(e => e.message)
       return res.status(400).json({errors: errors}) 
    }else if(err.name == 'customError'){
       return res.status(err.code).json({err: err.msg})
    }else{
       return res.status(500).json({error: 'Internal Server Error'})
    }
}

module.exports = errorHandler