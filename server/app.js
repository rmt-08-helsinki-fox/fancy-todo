if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`app listening on port: ${port}`);
})