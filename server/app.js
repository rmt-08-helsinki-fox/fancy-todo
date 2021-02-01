const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
  console.log("listening at port " + PORT);
})