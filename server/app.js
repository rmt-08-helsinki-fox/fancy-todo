if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const route = require('./routes');
const errorHandler = require('./helpers/errorHandler');
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(route)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("fancy todo listening on PORT", PORT);
})
