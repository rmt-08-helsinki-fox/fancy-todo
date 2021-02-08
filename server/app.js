if(process.env.NODE_ENV === 'development'){
    // console.log(process.env.NODE_ENV)
    require('dotenv').config()
}
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const router = require('./routes/router-index')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(router)

app.use(errorHandler)

app.listen(port, ()=> console.log(`todo app is running on port ${port}`))