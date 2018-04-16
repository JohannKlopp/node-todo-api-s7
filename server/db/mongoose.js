// mongoose configuration stuff
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var dbName = "TodoApp";
mongoose.connect(process.env.MONGODB_URI || `mongodb://172.18.1.26:27017/${dbName}`).then(() => {
  console.log(`Connected to "${dbName}" database.`);
}, (err) => {
  console.log(err);
});

module.exports = {mongoose};
