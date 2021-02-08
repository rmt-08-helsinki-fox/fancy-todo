if(process.env.NODE_ENV === "development"){
  require('dotenv').config()
}

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const router = require("./routers/index")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.log("running on port:", port);
})