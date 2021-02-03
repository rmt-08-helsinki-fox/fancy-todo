const axios = require("axios")

class Controller {
  static showAll(req, res, next){
    // res.send("aa")
    axios.get("https://covid-api.mmediagroup.fr/v1/cases")
      .then(response => {
        res.json(response.data)
      }).catch(err => {
        console.log(err);
        next(err)
      })
  }
  static showCountryCases(req, res, next) {
    let country = req.query.country
    let status = req.query.status
    axios({
      method: "get",
      url: `https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${status}`
    }).then(response => {
      res.json(response.data)
    }).catch(err => {
      console.log(err);
      next(err)
    })
  }
}

module.exports = Controller