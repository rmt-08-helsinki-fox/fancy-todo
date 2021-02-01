const express = require("express")
const app = express()
const router = require("./routes/index.js")
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use("/", router)

app.listen(port, () => console.log(`server running at port ${port}`))