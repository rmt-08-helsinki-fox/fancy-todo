const Error = (err, req, res, next) => {

    console.log('error handling')
    console.log(err)

    let {name} = err
    if(err.errors){
        res.status(400).json({message:err.errors[0].message})
    }else if(name === 'LOGIN_GAGAL'){
        res.status(400).json({message:'Login Gagal'})
    }else if(name === 'TOKEN_INVALID'){
        res.status(400).json({message:'Authentication failed'})
    }else if(name === 'NOT_AUTHORIZED'){
        res.status(403).json({message:'Authorization failed'})
    }else if(name === 'TODO_NOT_FOUND'){
        res.status(404).json({message:'Todo Tidak ditemukan'})
    }else if(name === 'NOT_FOUND'){
        res.status(400).json({message:'Error not found'})
    }else{
        if(err.original){
            res.status(400).json({message:err.original.toString()})
        }
        res.status(500).json({message:'Internal server error'})
    }

    // err.errors[0].message

}

module.exports={
    Error
}