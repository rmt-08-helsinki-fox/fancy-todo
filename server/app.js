if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Host connected on port : ${port}`)
})