const axios = require('axios')
const baseUrl = 'https://api.themoviedb.org/3'

class MovieController {

  static getAll(req, res) {
    axios.get(`${baseUrl}/discover/movie?api_key=0325b4988316cbf381d422df2916c1c2&sort_by=popularity.desc&page=${req.query.page || ''}`)
    .then( response => {
      response.data.results.forEach( mov => {
        mov.poster_path = 'https://www.themoviedb.org/t/p/w220_and_h330_face' + mov.poster_path
      })
      res.json(response.data)
    })
    .catch( err => {
      res.send(err)
    })
  }

}

module.exports = MovieController