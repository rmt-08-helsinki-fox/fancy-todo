if(process.env.NODE_ENV.trim() === "development"){
  require("dotenv").config()
}

const cors = require('cors')
const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 3000
const errorHandling = require('./middlewares/errorHandling')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)

app.use(errorHandling)

app.listen(port, () => {
  console.log('Listening on port', port)
})