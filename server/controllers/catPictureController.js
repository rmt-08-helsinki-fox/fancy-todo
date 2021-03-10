const axios = require("axios")

class CatPictureController {
    static async getCatPicture(req, res, next) {
        try {
            const response = await axios({
                method: "GET",
                url: `https://api.thecatapi.com/v1/breeds`,
                headers: {
                    "x-api-key": process.env.X_API_KEY,
                },
            })
            let randomizer = Math.floor(Math.random() * 67)
            const data = {
                breed: response.data[randomizer].name,
                imgUrl: response.data[randomizer].image.url,
            }
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CatPictureController
