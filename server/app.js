if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/error-handler')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

//error handler sebagai middle paling akhir --
app.use(errorHandler)



app.listen(port, () => {
  console.log(`app running on port ${port}`)
})