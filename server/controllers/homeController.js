const axios = require('axios')


class HomeController {

  static showHome(req, res) {
    axios.get('https://api.adviceslip.com/advice')
    .then(adv => {
      let dataAdvice = {
        advice: adv.data.slip.advice,
        author: 'unknown'
      }
      res.json(dataAdvice)
    })
    .catch(err => {
      res.status(500).json(err)
    })

  }
}

module.exports = HomeController