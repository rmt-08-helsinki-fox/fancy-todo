if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./helpers')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`LISTENING TO : ${PORT}`));