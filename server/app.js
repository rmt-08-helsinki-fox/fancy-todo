if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const route = require('./routes')
const errorHandler = require('./helpers/errorHandler')
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(route)
app.use(errorHandler)

app.listen(PORT, () => console.log(`server running at port ${PORT}`))