require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routers/index");
const errorHandler = require("./middleware/errHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
