const express = require('express');
const router = require('./routers');

const app = express();
const PORT = 3000;

app.use(router);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));