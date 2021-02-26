if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes')
const cors = require('cors')
const errorHandlers = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(router)
app.use(errorHandlers)

app.listen(PORT, () => {console.log('server on port', PORT)})