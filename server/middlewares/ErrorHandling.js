const Error = (err, req, res, next) => {

    console.log('error handling')

    let {name} = err

    if(name === 'SequelizeUniqueConstraintError'){
        res.status(400).json(err.errors[0].message)
    }
    else if(name === 'LOGIN_GAGAL'){
        res.status(400).json('Login Gagal')
    }else{
        res.status(500).json('Error not defined')
    }

    // err.errors[0].message

}

module.exports={
    Error
}