const express = require("express")
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const app = express()
const port = 3000;
const router = require("./router/main")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use("/", router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`ported at: ${port}`);
})