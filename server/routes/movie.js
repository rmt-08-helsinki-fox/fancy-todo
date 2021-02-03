const router = require("express").Router();
const { MovieController } = require("../controllers");

router.get('/', MovieController.getAll);

module.exports = router;
