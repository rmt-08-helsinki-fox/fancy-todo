// var currentDate = new Date();
// console.log("The current date="+currentDate);
var yesterdayDate = new Date().setDate(new Date().getDate()- 1);
console.log("The yesterday date ="+new Date(yesterdayDate));