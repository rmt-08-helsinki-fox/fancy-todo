require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3500
const router = require('./routes')
const errHandler = require('./middleware/errHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(router)

app.use(errHandler)

app.listen(PORT, function() {
    console.log(`App running on port: ${PORT}`);
})