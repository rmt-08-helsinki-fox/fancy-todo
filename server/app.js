require('dotenv').config()
const express = require('express')
const router = require('./router/index')
const app = express()
const PORT = process.env.PORT || 3000
// const { errorHandler } = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(router)
// app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})