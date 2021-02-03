require("dotenv").config()

const express = require("express");
const router = require("./Routes/index")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")
const app = express();
const PORT = 3000;

//body parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//routes
app.use(router)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`This app running on port: ${PORT}`)
})

