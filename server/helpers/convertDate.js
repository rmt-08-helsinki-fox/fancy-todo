function convertDate(d) {
    if (d) {
        d = new Date(d);
        return [d.getFullYear(), d.getMonth()+1, d.getDate()]
            .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
    } else {
        return d;
    }
}

module.exports = convertDate;