if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const errorHandlers = require('./helpers/errorHandlers')

const app = express()
const port = 3000

// Cors
app.use(cors())

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use(routes)
app.use(errorHandlers)

// Listener
app.listen(port, () => console.log(`Listening on port ${port}`))