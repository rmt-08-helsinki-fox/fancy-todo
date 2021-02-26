function getYesterday() {
  let date = new Date()
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10)
}

module.exports = getYesterday