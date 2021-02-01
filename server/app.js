//@ts-check
require("dotenv").config()
const express = require("express")
const { errorHandler } = require("./middlewares/errorHandler")

const app = express()
const PORT = parseInt(process.env.PORT) || 3000

const router = require("./routes")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
