const axios = require('axios')

class Qur_anController{
  static showAll(req, res, next){
    axios.get("https://al-quran-8d642.firebaseio.com/data.json?print=pretty")
    .then(({data}) => res.status(200).json(data))
    .catch(err => next(err))
  }

  static findOne(req, res, next){
    const id = +req.params.id
    axios.get(`https://al-quran-8d642.firebaseio.com/surat/${id}.json?print=pretty`)
    .then(({data}) => res.status(200).json(data))
    .catch(err => next(err))
  }
}

module.exports = Qur_anController