const bcrypt = require('bcryptjs');

function hash(text) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(text, salt);
    return hash
}

function compare(text, hash) {
    return bcrypt.compareSync(text, hash)
    
}

module.exports = {hash,compare}