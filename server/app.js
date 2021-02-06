if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const index = require('./routes/index.js');
const app = express();
const errorhandler = require('./middlewares/errorhandler')
const cors = require('cors')

const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/',index);

app.use(errorhandler);

app.listen(port, () => {
  console.log('running on port: ', port); 
})