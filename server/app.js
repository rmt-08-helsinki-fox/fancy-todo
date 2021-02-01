const express = require('express')
const app = express()
const port = 3000
const todosRouter = require('./routes/todosRouter')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/todos', todosRouter)



app.listen(port, () => {
    console.log('listening port ' + port);
})