// mongoose configuration stuff
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://172.18.1.26:27017/TodoApp");

module.exports = {mongoose};
