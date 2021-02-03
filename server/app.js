if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const router = require('./routes/index')
const errorhandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorhandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})