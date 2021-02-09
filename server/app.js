if (process.env.NODE_ENV === "development") require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3121
const router = require('./routes/index')
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use("/", router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})