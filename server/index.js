const express = require('express')

require('dotenv').config()

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {router} = require('./router')
app.use(router)

const {Error} = require('./middlewares/ErrorHandling')
app.use(Error)


app.listen(PORT, ()=>console.log('App is running in ',PORT))