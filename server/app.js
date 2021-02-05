require('dotenv').config({path: __dirname + '/.env'})
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = 5000
const routes = require('./routes/index')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log(`sever running on port:${port}`))