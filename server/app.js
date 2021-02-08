if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
//untuk tes di local
//NODE_ENV=development npx nodemon app.js

//hanya di development
// require('dotenv').config()

const express = require('express');
const port = process.env.PORT || 3000
const app = express();
const routes = require('./routes/index')
const cors = require('cors')
const errorhandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.use(errorhandler)

app.listen(port, () => {
    console.log('running on port', port);
})