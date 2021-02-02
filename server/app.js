require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler')
const express = require('express');
const routes = require('./routes');


const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log('this is listening to ', port);
})