if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express")
const router = require("./routes/index")
const errorhandler = require("./middlewares/errorhandler")

const app = express()
const PORT = 3000

// app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)
app.use(errorhandler)

app.listen(PORT, ()=>{
    console.log(`Fancy TODO running on PORT ${PORT}`);
})