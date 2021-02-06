const axios = require('axios').default;

class Anime {
  constructor(anime) {
    this.title = anime.title
    this.image_url = anime.image_url
    this.type = anime.type
    this.episodes = anime.episodes
    this.status = anime.status
    this.rating = anime.rating
    this.rating_by = anime.rating_by
    this.genres = anime.genres
    this.studios = anime.genres
    this.aired = anime.aired
    this.synopsis = anime.synopsis
  }

  static async getAnime(req, res, next) {
    try {
      let id = Math.ceil(Math.random()*9000)
      let response = await axios.get(`https://api.jikan.moe/v3/anime/${id}`)
      let isUnderRating = (response.data.score < 7)
      let isNotSerialTV = (response.data.type !== "TV")
      let isBelow2000 = (response.data.aired.prop.to.year <= 2000)
      if( isUnderRating || isNotSerialTV || isBelow2000 ) { throw { name: "Error" } }

      const genres = response.data.genres.map(genre => genre.name)
      const studios = response.data.producers.map(studio => studio.name)
      let anime = {
        title: response.data.title,
        image_url: response.data.image_url,
        type: response.data.type,
        episodes: response.data.episodes,
        status: response.data.status,
        rating: response.data.score,
        rating_by: response.data.scored_by,
        genres,
        studios,
        aired: response.data.aired,
        synopsis: response.data.synopsis
      }
      return res.status(200).json(new Anime(anime))
    } catch (err) {
      if(err.name === "Error") {
        return Anime.getAnime(req, res, next)
      }
      next(err)
    }
  }
}
module.exports = Anime;