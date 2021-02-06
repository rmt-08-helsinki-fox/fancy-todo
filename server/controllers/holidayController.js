const axios = require("axios")

module.exports = class HolidayController {
  static getHoliday(req, res, next) {
    axios({
      method: "get",
      url: "https://date.nager.at/Api/v2/PublicHolidays/2021/ID"
    })
      .then(result => {
        let holidays = []
        result.data.forEach(holiday => {
          let obj = {
            date: holiday.date,
            name: holiday.localName
          }
          holidays.push(obj)
        })
        res.status(200).json(holidays)
      })
      .catch(err => {
        next(err)
      })
  }
}