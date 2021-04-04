const Error = (err, req, res, next) => {

    console.log('error handling')
    console.log(err)

    let {name} = err
    if(err.errors){
        res.status(400).json({message:err.errors[0].message})
    }else if(err.original){
        res.status(400).json({message:err.original.toString()})
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
    }else if(name === 'BREWERY_ERROR'){
        res.status(400).json({message: 'Public Api error'})
    }else{
        res.status(500).json({message:'Internal server error'})
    }

}

module.exports={
    Error
}