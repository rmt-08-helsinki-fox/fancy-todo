const router = require('express').Router();
const QuotesController = require('../controller/quotesController');

const { mid } = require('../helper/middleware');

router.use(mid);
router.get('/', QuotesController.getQuote);

module.exports = router;