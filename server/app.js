if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const index = require('./routes')
const errorHandler = require('./middlewares/errHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', index)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`This app running on port: ${port}`);
})
