require('dotenv').config()
const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/router')
var cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})