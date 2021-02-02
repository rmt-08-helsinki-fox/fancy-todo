const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN
const API_KEY = process.env.API_KEY
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});

const sendEmail = (email) => {
  mg.messages()
  .send({
    from: `Fancy Todo <test@${DOMAIN}>`,
    to: email,
    subject: 'Wellcome to fancy todo app',
    text: 'Thankyou for registration'
  })

  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = sendEmail;
