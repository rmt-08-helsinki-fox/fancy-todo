require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const router = require('./routers/index')
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.use(errorHandler)

app.listen(PORT, () => console.log('This Server is Running on', PORT))