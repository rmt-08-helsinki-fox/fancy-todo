if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
console.log(process.env.NODE_ENV)

const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/router')
const errorHandler = require('./middleware/errorhandler')
const errorhandler = require('./middleware/errorhandler')


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(router)
app.use(errorhandler)

app.listen(PORT, () => {
    console.log(`this server listening on ${PORT}`)
})