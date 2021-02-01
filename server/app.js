require('dotenv').config()
const express = require('express');
const port = 3000
const app = express();
const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.listen(port, () => {
    console.log('running on port', port);
})