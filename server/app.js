const express = require("express")
const app = express()
const port = 3000
const routes = require("./routes/index")


app.use(express.urlencoded({extended : false}))

app.use(routes)

app.listen(port, function() {
    console.log(`this app is running on port ${port}`)
})