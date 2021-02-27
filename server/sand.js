const moment = require('moment')

const dates = new Date()
const date = moment(dates).subtract(1, 'days').toString();

console.log(date);
console.log(dates.toString());