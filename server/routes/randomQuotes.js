const express = require('express')
const router = express.Router()
const RandomQuotes = require('../controllers/RandomQuotes.js')

router.get("/", RandomQuotes.getQuote)

module.exports = router