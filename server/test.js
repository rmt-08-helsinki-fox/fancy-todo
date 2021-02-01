let str = `GIa123`
// const regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,})$/
const regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,})$/

console.log(str.match(regex));