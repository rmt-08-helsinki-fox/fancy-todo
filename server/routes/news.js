const NewsController = require('../controllers/newsController')

const router = require('express').Router()

router.get('/news', NewsController.newsIndo)
router.get('/news/:category', NewsController.newsCategory)

module.exports = router