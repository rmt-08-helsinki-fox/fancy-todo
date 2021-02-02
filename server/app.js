const express = require('express');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const PORT = 3000;
const routes = require('./routes');
const errorHandling = require('./helper/errorHandling');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(routes);

// Error handling
app.use(errorHandling);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});