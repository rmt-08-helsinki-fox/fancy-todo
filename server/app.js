const express = require('express')
const app = express()
const PORT = 3000
const route = require('./routes');
const bodyParser = require('body-parser')

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(route)

app.listen(PORT, () => {
  console.log("fancy todo listening on PORT", PORT);
})
