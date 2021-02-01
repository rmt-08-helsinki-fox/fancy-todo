const bcrypt = require('bcryptjs');


function hasspass(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function compare(password,hassedpassword){
    return bcrypt.compareSync(password,hassedpassword)
}


 module.exports= {
     hasspass,
     compare
 }



