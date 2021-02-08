if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const cors = require('cors')
const router = require('./routers/index')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log('todo app is running in port: ', port)
})