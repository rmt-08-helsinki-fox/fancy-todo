function dateParsing() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let Nmonth
    if (month === 0) {
        Nmonth = month 
    } else {
        Nmonth = month + 1
    }
    let day = date.getDate()
    let m
    let d
    if (Nmonth < 10) {
        m = `0${Nmonth}`
    } else {
        m = `${Nmonth}`
    }

    if (day < 10) {
        d = `0${day}`
    } else {
        d = `${day}`
    }
    let newDate = `${year}-${m}-${d}`
    return newDate
}

module.exports = dateParsing