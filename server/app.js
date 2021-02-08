if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const router = require("./routes");
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler");

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Run in port ", port);
});
