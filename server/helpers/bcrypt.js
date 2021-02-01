const bcrypt = require('bcryptjs');

const hashing = (pass)=>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
}

const compare = (input, pass)=>{
    return bcrypt.compareSync(input, pass);
}
module.exports = {hashing,compare}