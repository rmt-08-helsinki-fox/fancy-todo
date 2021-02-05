const moment = require('moment');

const momentJs = (time) => {
    
    let check = time.toLocaleString().split(',')[0]
    let hour = time.getHours();

    console.log(check);

    return moment(`${check}/${hour}`, "MM/DD/YYYY/HH").fromNow();   
}

module.exports = momentJs;