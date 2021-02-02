const bcrypt = require('bcryptjs');

const hashText = (text) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync("text", salt);
}

const compareText = (text, hashText) => {
  return bcrypt.compareSync(text, hashText);
}

module.exports = {
  hashText,
  compareText
}