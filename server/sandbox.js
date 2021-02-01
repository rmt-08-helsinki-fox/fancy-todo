let now = new Date().toISOString().split("T")[0]
let another = '2021-01-25'
console.log(now)

if (now > another) {
  console.log("another udh lewat")
} else {
  console.log("belum lewat");
}