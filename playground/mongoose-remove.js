const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({_id: "5ad47df5d5b26e158f918c76"}).then((result) => {
//
// });

Todo.findByIdAndRemove("5ad47df5d5b26e158f918c76").then((todo) => {
  console.log(todo);
});
