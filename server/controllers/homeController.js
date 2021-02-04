const axios = require('axios')


class HomeController {

  static showHome(req, res, next) {
    axios.get('https://api.adviceslip.com/advice')
    .then(adv => {
      let dataAdvice = {
        advice: adv.data.slip.advice,
        label: '-random advice'
      }
      res.json(dataAdvice)
    })
    .catch(err => {
      next(err)
    })

  }
}

module.exports = HomeController