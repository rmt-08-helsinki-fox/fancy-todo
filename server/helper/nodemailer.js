const nodemailer = require('nodemailer')
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c365ef06f72a20",
        pass: "48592be76296e2"
    }
});

function sendMail(email) {
    const message = {
        from: 'fancytodo@fancytodo.com', // Sender address
        to: `${email}`,         // List of recipients
        subject: 'You just created a todo', // Subject line
        text: 'lets make some fun more !' // Plain text body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

module.exports = sendMail