var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

console.log(token)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2MTIyNjY0Njd9.WWKA5Sn_7QMQguxtheAwYGzKhxXctSwBc3sg2FYTKMw

var decoded = jwt.verify(token, 'shhhhh');

console.log(decoded)