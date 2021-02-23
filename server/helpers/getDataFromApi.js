const { getYear, formatDate } = require("./formatDate")
const axios = require('axios')

async function holiday(elm) {
    let getHolidays = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=b882e419f02f162fa639476b1df9b62b10fcb39b&country=ID&year=${getYear(elm.due_date)}`)
    let holidays = getHolidays.data.response.holidays
    let events = []
    holidays.forEach(day => {
        if (formatDate(elm.due_date) === formatDate(day.date.iso)) {
            events.push(day.name)
        }
    })
    let todo = {
        id: elm.id,
        title: elm.title,
        description: elm.description,
        status: elm.status,
        due_date: formatDate(elm.due_date),
        events: events
    }
    return todo
    // return getHolidays.data.response.holidays
}

module.exports = holiday