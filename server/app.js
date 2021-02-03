if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const router = require('./routes')
const cors = require('cors')
const app = express()
const port = 3000
const { errorHandler } = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})