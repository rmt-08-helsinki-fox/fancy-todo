if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routes/index')

const app = express()
const port = 3000

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use(routes)

// Listener
app.listen(port, () => console.log(`Listening on port ${port}`))