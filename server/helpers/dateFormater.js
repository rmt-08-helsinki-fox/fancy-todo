function dateFormater() {
  const data = new Date();
  const year = data.getFullYear();
  const month = data.getMonth();
  const day = data.getDate();

  return `${year}-${month + 1}-${day}`;
}

module.exports = dateFormater;
