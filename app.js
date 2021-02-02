if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express()

const router = require('./routes/')
const port = 3001

app.set ('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(port, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log(`listening on port ${port}`)
  }
})
