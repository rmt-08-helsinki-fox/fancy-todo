function getValidationDate() {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString()
}

module.exports = getValidationDate