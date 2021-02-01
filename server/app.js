const express = require("express");
const router = require("./Routes/index")
const app = express();
const PORT = 3000;

//body parser
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//routes
app.use(router)

app.listen(PORT, () => {
    console.log(`This app running on port: ${PORT}`)
})

