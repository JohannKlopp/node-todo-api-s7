const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");


// var id = "5acdf0c5de322321482f499211";
//
// if(!ObjectID.isValid(id)) {
//   console.log("ID not valid.");
// }

// Todo.find({
//   _id: id
// }).then((todos) =>{
//   if(!todos) {
//     return console.log("Id not found.");
//   }
//   console.log("Todos:", todos);
// });
//
// // !todo only works when .then returns "null"
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   if(!todo) {
//     return console.log("Id not found.");
//   }
//   console.log("Todo:", todo);
// });

// Todo.findById(id).then((todo) =>{
//   if(!todo) {
//     return console.log("Id not found.");
//   }
//   console.log("Todo By Id:", todo);
// }).catch((e) => console.log(e));

// query users collection (get an id), use user.findById,
// Then handle the 3 cases:
// 1. Query works, but there is no user with the id
// 2. user was found and print user
// 3. Handle any errors that might have occurred

var userId = "5ab9ffb7d23d262d7874bd02";

if(!ObjectID.isValid(userId)) {
  return console.log("This id is invalid.");
}
else {
  User.findById(userId).then((user) => {
    if(user === null) {
      return console.log("Id is valid but no user with that id was found.");
    }
    else {
      console.log("User found by Id:\n", JSON.stringify(user, undefined, 2));
    }
  }).catch((e) => {console.log("Another error occurred:"+e)});
};
