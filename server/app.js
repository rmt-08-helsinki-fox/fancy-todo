const express = require('express')
const app = express()
const PORT = 3500
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(router)

app.listen(PORT, function() {
    console.log(`App running on port: ${PORT}`);
})