const err = (error) => {
    if(error.name && error.name.includes("Sequelize")){
        return {statusCodeRes : 400, msg : error.errors.map(item => item.message)};
    }
    let statusCodeRes = error.statusCode || 500
    delete error.statusCode;
    return {statusCodeRes, msg : error};
}

module.exports = err;