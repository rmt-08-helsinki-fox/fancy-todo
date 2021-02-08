if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const cors = require('cors')
const router = require('./routers/index')
const { response } = require('express')
const app = express()
const port = 3000

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log('todo app is running in port: ', port)
})