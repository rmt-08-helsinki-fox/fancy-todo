if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes/index.js");
const errHandle = require("./middleware/errHandle");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errHandle);

app.listen(PORT, () => {
	console.log(`Working on port: ${PORT}`);
});
