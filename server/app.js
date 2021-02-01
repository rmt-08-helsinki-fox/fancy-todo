const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')


app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use(router)


app.listen(port, ()=> {
    console.log(`connected at  ${port}`)
})




