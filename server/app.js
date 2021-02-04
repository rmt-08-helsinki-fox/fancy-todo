const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')
require('dotenv').config()
const errorHandler = require('./helper/errorHandler')
var cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

app.use('/', router)

app.use(errorHandler)

app.listen(PORT, ()=> {console.log('running on port', PORT);})