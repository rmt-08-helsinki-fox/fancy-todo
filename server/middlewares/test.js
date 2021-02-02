const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


let hashData='$2b$10$EvaGFqShHBOkZlBf7KBWW..QimXKUgeGbyG0gzJ7aksBI7bLAX9XS'

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash)
});



bcrypt.compare(myPlaintextPassword, hashData, function(err, result) {
    // result == true
    console.log(result)
});

bcrypt.compare(someOtherPlaintextPassword, hashData, function(err, result) {
    // result == false
    console.log(result)
});