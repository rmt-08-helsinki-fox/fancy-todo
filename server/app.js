require('dotenv').config()
const { urlencoded } = require('body-parser')
const express = require('express') 
const app = express()
const port = 3000 
const router = require('./routers/index') 
const errorHandlers = require ('./middlewares/errorHandlers') 
const cors = require('cors')

app.use(cors())
app.use (express.urlencoded ({extended : true}))
app.use('/', router) 
app.use(errorHandlers)

app.listen(port, () => { 
    console.log(`This app is running on port : ${port}`)
})