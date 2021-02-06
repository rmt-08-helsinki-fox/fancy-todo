const express = require("express");
const router = express.Router();
const controllers = require("../controllers/ApiController");

router.get("/holidays", controllers.getHolidays);

module.exports = router;
