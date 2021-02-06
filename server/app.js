if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}
const express = require('express')
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const app = express()
const PORT = 3000

console.log(process.env.NODE_ENV)

// cors : izin untuk client mengakses server
app.use(cors())

// body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', routes)

// error handler 
app.use(errorHandler)
  
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})