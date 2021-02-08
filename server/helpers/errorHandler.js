const err = (err,req,res,next) => {
    if(err.name){
        if(err.name.includes("Sequelize")){
            if(Array.isArray(err.errors))
                return res.status(400).json({msg : err.errors.map(item => item.message)});
            else{
                return res.status(400).json({msg : err});
            }
        }
        else if(err.name == 'custom')
            return res.status(err.statusCode).json({msg : err.msg});
    }
    console.log(err);
    return res.status(500).json({msg : 'Internal Server Error'});
}

module.exports = err;