require('dotenv').config()
const express = require('express')
const { errorHandler } = require('./middlewares/errorHandler')
const app = express()
const PORT = 3000

const router = require('./routes/router')

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(PORT, () => console.log(`App running in port: ${PORT}`))