require('dotenv').config()

const express = require('express')
const router = require('./routes/index')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(router)

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))