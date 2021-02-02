if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = require('./routers/index')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

app.use((err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({ error: err.errors[0].message })
    } else if (err.name === 'CustomError') {
        res.status(err.status).json({ error: err.msg })
    } else {
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(port, () => {
    console.log('todo app is running in port: ', port)
})
