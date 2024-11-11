const url = require('url');
const myURL = url.parse('http://localhost:3001/home/user?id=1&fname=tejas&lname=kulkarni', true)

console.log(myURL.query.fname)

