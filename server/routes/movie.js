const router = require("express").Router();
const { MovieController } = require("../controllers");

router.get('/', MovieController.getAll);
router.get('/search/:search', MovieController.getBySearch)

module.exports = router;
