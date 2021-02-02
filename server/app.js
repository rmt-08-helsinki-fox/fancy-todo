require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
})