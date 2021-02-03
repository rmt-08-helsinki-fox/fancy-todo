require('dotenv').config()
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`running on port: ${port}`)
})