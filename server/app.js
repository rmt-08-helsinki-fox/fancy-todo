if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const port = 3000
const routes = require("./routes/index")
const errorHandler = require("./middlewares/errorhandler")


app.use(express.urlencoded({extended : true}))

app.use(routes)

app.use(errorHandler)

app.listen(port, function() {
    console.log(`this app is running on port ${port}`)
})