const today = new Date().toISOString().slice(0,10)
let tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow = tomorrow.toISOString().slice(0,10)

module.exports = tomorrow