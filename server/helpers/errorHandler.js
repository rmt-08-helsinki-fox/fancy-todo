const err = (err,req,res,next) => {
    if(err.name){
        if(err.name.includes("Sequelize"))
            return res.status(400).json({msg : err.errors.map(item => item.message)});
        else if(err.name == 'custom')
            return res.status(err.statusCode).json({msg : err.msg});
    }
    return res.status(500).json({msg : 'Internal Server Error'});
}

module.exports = err;