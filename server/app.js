const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routers/index");

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
