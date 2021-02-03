require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('./routes')
const errorsHandler = require('./middleware/errorshandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)

app.use(errorsHandler)

app.listen(PORT, () => {console.log('server running on port', PORT)})
