if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const errorHandling = require('./helper/errorHandling');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(routes);

// Error handling
app.use(errorHandling);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});