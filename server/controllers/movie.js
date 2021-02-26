const axios = require('axios')
const baseUrl = 'https://api.themoviedb.org/3'

class MovieController {

  static getAll(req, res) {
    axios.get(`${baseUrl}/discover/movie?api_key=0325b4988316cbf381d422df2916c1c2&sort_by=popularity.desc&page=${req.query.page || ''}`)
    .then( response => {
      response.data.results.forEach( mov => {
        mov.poster_path = 'https://image.tmdb.org/t/p/w500' + mov.poster_path
      })
      res.json(response.data)
    })
    .catch( err => {
      res.send(err)
    })
  }

  static getBySearch(req, res) {
    axios.get(`${baseUrl}/search/movie?api_key=0325b4988316cbf381d422df2916c1c2&language=en-US&query=${req.params.search}&page=1&include_adult=false`)
    .then( response => {
      response.data.results.forEach( mov => {
        mov.poster_path = 'https://image.tmdb.org/t/p/w500' + mov.poster_path
      })
      res.json(response.data)
    })
    .catch( err => {
      res.send(err)
    })
  }

}

module.exports = MovieController