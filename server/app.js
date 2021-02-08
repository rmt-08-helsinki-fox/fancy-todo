//@ts-check
if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}

require("dotenv").config()
const express = require("express")
const { errorHandler } = require("./middlewares/errorHandler")
const cors = require("cors")

const app = express()
const PORT = parseInt(process.env.PORT) || 3000

const router = require("./routes/route")

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
