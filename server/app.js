if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require('dotenv').config()

const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const router = require('./routes/index.js')
const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})

module.exports = router