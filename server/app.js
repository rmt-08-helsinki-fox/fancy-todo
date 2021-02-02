require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/router')



app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(router)

app.listen(PORT, () => {
    console.log(`this server listening on ${PORT}`)
})