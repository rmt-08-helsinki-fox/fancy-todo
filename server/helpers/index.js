function checkPassword (password) {
  const err = [`Password must contain at least one number one upper case and one symbol`, `Password must be at least 8 characters`];
  const specialCharacter = /^[A-Za-z0-9 ]+$/;
  const symbol = /^[A-Za-z0-9 ]+$/.test(password)
  let number = /\d+/.test(password);
  let countUpper = 0;
  
  password = password.split('');

  password.forEach(el => {
    if (isNaN(el)) if (el.toUpperCase() == el && el.toLowerCase() != el) countUpper++;
  });

  if (password.length < 8) return err[1];
  else if (!number) return err[0];
  else if (!countUpper) return err[0];
  else if (symbol) return err[0];
  
  return null;
};

module.exports = { checkPassword };