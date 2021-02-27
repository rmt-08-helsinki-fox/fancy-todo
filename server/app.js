if(process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const errorHandler = require('./middlewares/errorHandler')
const express = require('express');
const cors = require('cors')
const routes = require('./routes');


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log('this is listening to ', port);
})