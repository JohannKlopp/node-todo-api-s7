const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
  id: 10
};

var token = jwt.sign(data, "123acb"); //value sent to user on signup/login, also the value, we'll store inside the tokens array
console.log(token);

var decoded = jwt.verify(token, "123acb");
console.log("decoded:", decoded);
// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "some secret").toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + "some secret").toString();
// if (resultHash === token.hash) {
//   console.log("Data was not changed");
// }
// else {
//   console.log("Data was changed. Do not trust!");
// }
