const Auth = (req, res, next)=>{

    if(false){
        next()
    }else{
        res.status(500).json('test')
        // res.status(500).send('Authentication failed')
    }

}

module.exports={
    Auth
}