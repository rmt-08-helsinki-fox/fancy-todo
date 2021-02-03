require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

//error handler sebagai middle paling akhir --
app.use((err, req, res, next) => {
  // error sequelize
  if(err.name === 'SequelizeValidationError') {
    const errors = []
    err.errors.forEach((el) => {
      errors.push(el.message)
    })
    res.status(400).json({ messages: errors })
  }
  //error unique constraint/email sudah terpakai
  else if(err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: 'email already been used' })
  }
  // error authentication, authorization
  else if(err.name === 'JsonWebTokenError' || err.message === 'Not Authorized') {
    res.status(401).json(err.message)
  }
  // untuk case error: throw new Error
  else if(err.name === 'Error') {
    res.status(400).json(err.message)
  }
  else {
    // lainnya
    const message = 'Internal Server Error'
    res.status(500).json(message)
  }
})

app.listen(port, () => {
  console.log(`app running on port ${port}`)
})