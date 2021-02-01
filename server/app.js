const express = require('express');
const app = express();
const route = require('./routes')
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(route)

app.listen(PORT, () => console.log(`server running at port ${PORT}`))