if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use('/',router)
app.use(errorHandler)
app.listen(port,()=>{
    console.log('app running on port:'+port);
})