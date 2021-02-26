const today = new Date().toISOString().slice(0,10)
let yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
yesterday = yesterday.toISOString().slice(0,10)

module.exports = yesterday