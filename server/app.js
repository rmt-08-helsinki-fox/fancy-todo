require('dotenv').config()
const express = require('express')
const routes = require('./routes/index.js')
const app = express()
const PORT = 3000

// body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', routes)
  
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})