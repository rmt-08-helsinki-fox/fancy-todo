if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

console.log(process.env.NODE_ENV)


const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(router)


app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})