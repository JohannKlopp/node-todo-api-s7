// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://172.18.1.26:27017/TodoApp", (err, client) => {
  if (err) {
    console.log("Unable to connect to mongodb server");
  } else {
    console.log("Connected to mongodb server.");
  }
  const db = client.db("TodoApp");

  // db.collection("Todos").insertOne({
  //   text: "Continue reading Sapiens",
  //   completed: false,
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert todo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection("Users").insertOne({
  //   name: "Johann Klopp",
  //   age: 19,
  //   location: "Porto, Portugal",
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert user");
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});
