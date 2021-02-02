require('dotenv').config()
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = 3000
const routes = require('./routes/index')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log(`sever running on port:${port}`))