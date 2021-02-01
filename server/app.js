require('dotenv').config()
const express = require('express')
const router = require('./router/index')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(router)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})