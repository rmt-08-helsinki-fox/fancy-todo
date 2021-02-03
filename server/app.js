if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env'});
}
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hello app')
})

app.use(router)

app.listen(PORT, () => {
    console.log(`Connected on http://localhost:${PORT}`)
})