const axios = require('axios').default;


const instance = axios.create({
    baseURL: 'https://api.spoonacular.com/',
    timeout: 1000,
    params: {
        apiKey: process.env.apiKey
    }
});

module.exports = instance