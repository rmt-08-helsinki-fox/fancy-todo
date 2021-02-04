require('dotenv').config()
const { errorHandler } = require('./middleware/errorHandler')
const router = require('./router/index')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})