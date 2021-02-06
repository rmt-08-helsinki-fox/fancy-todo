// const router = require("express").Router()
const express = require("express")
const router = express.Router()
const CovidController = require("../controllers/covidController")

router.get("/", CovidController.showAll)
router.get("/history", CovidController.showCountryCases)

module.exports =router