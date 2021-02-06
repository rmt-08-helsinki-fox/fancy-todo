if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes");
const cors = require("cors")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))