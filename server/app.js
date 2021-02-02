if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes/index')

app.use(express.urlencoded({extended:false}))
app.use(routes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server running in port ${port}`))