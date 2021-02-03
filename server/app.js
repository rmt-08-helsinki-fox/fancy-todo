if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const router = require('./routes/index.js');
const cors = require('cors');

const port = 3000;

app.use(cors())
app.use(express.urlencoded({ extended : true }))

app.use(router)



app.listen(port, () => {console.log(`we are listening on port`, port)})

