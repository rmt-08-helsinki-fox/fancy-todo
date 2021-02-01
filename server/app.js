const { urlencoded } = require("express");
const express = require("express")
const app = express()
const port = 3000;
const router = require("./router/main")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use("/", router)


app.listen(port, () => {
    console.log(`ported at: ${port}`);
})