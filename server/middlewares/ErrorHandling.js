const Error = (err, req, res, next) => {

    console.log('error handling')
    console.log(err.name)

    let {name} = err
    if(err.errors){
        res.status(400).json(err.errors[0].message)
    }else if(name === 'LOGIN_GAGAL'){
        res.status(400).json('Login Gagal')
    }else if(name === 'TOKEN_INVALID'){
        res.status(400).json('Authentication failed')
    }else if(name === 'NOT_AUTHORIZED'){
        res.status(400).json('Authorization failed')
    }else if(name === 'TODO_NOT_FOUND'){
        res.status(404).json('Todo Tidak ditemukan')
    }else if(name === 'NOT_FOUND'){
        res.status(400).json('Error not found')
    }else{
        res.status(500).json('Internal server error')
    }

    // err.errors[0].message

}

module.exports={
    Error
}