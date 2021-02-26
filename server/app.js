if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const todosRouter = require('./routes/todosRouter')
const usersRouter = require('./routes/usersRouter')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/todos', todosRouter)
app.use('/users', usersRouter)
app.use(errorHandler)


app.listen(port, () => {
    console.log('listening port ' + port);
})