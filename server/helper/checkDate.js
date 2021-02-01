const checkDate = (inputDate) => {
    const dateArr = inputDate.split('-');
    const now = new Date();
    const yearNow = now.getFullYear();
    const monthNow = 1 + now.getMonth();
    const dateNow = now.getDate();

    if (dateArr[0].length !== 4 || dateArr[1].length !== 2 || dateArr[2].length !== 2) {
        return 'invalid_format';
    }

    if (Number(dateArr[0]) < yearNow || Number(dateArr[1]) < monthNow || Number(dateArr[2]) < dateNow) {
        return 'invalid_due_date';
    }
}

module.exports = { checkDate }