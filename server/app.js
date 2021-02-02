require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const errorHandling = require('./middleware/errorhandling')


app.use(express.json())

app.use(express.urlencoded({extended:false}))


app.use(router)


app.use(errorHandling)

app.listen(port, ()=> {
    console.log(`connected at  ${port}`)
})




