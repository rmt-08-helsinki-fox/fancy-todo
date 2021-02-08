const axios = require('axios')

class Controller {
  static async categoryQuote(req, res, next){
    try {
      const APIKey = process.env.API_KEY
      let category = ['funny','car','great','success','sports','food', 'time']
      let url = `https://favqs.com/api/quotes/?filter=${ category[Math.floor(Math.random() * category.length)] }&type=tag`
  
      let response = await axios({
        method: 'get',
        url,
        headers: {
          Authorization: APIKey
        }
      })
      let pickedQuote = response.data.quotes[Math.floor(Math.random() * response.data.quotes.length)]
      let output = {
        author: pickedQuote.author,
        quote: pickedQuote.body
      }
      res.status(200).json(output)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}
module.exports = Controller