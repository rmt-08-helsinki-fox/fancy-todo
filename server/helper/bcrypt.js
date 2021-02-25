const bcrypt = require('bcryptjs');


function hasspass(plainPassword){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainPassword, salt)

    return hash
}

function compare(password,hassedpassword){
    return bcrypt.compareSync(password,hassedpassword)
}


 module.exports= {
     hasspass,
     compare
 }



