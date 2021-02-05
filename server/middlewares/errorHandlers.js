function errorHandlers (err,req,res,next) { 
    let arr = []
    let status = 500 
    if (err.name === 'SequelizeValidationError') { 
        status = 400 
        for (let i = 0 ; i < err.errors.length ; i ++) { 
            arr.push(err.errors[i].message)
        }
    } else if (err.name === 'SequelizeUniqueConstraintError') { 
        status = 400 
        for (let i = 0 ; i < err.errors.length ; i ++) { 
            arr.push(err.errors[i].message)
        }
    } else if (err.name === 'ErrorNotFound') { 
        status = 404 
        arr.push(err.msg)
    } else if (err.name === 'LoginError') { 
        status = 400  
        arr.push(err.msg) 
    } 
    else { 
        arr.push('Internal Server Error')
    }
    res.status(status).json(arr)
} 

module.exports = errorHandlers