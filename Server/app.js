const express = require('express')
const app = express()
const router = require('./routers/index')
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(PORT, () => console.log('This Server is Running on', PORT))