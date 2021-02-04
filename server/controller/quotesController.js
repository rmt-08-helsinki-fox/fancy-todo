const axios = require('axios');
class QuotesController {
    static async getQuote(req, res) {
        try {
            // Shot api quotes
            const getQuotes = await axios({
                method: 'get',
                url: 'https://andruxnet-random-famous-quotes.p.rapidapi.com?cat=famous',
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST
                },
            });

            const quotes = `${getQuotes.data[0].quote} --${getQuotes.data[0].author}`;
            const msg = {
                message: 'Success',
                data: quotes
            }
            res.status(200).json(msg);
        } catch (err) {
            next(err)
        }
    }
}
module.exports = QuotesController;