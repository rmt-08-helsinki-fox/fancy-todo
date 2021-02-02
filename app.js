const { urlencoded } = require('body-parser')
const express = require('express') 
const app = express()
const port = 3000 
const router = require('./routers/index')

app.use (express.urlencoded ({extended : true}))
app.use('/', router)
app.listen(port, () => { 
    console.log(`This app is running on port : ${port}`)
})