const axios = require("axios")

class Controller {
  static showAll(req, res, next){
    // res.send("aa")
    axios.get("https://covid-api.mmediagroup.fr/v1/cases")
      .then(response => {
        console.log(response);
        res.status(200).json(response.data.Indonesia.All)
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
      console.log(response);
      res.status(200).json(response.data)
    }).catch(err => {
      console.log(err);
      next(err)
    })
  }
}

module.exports = Controller