// const MongoClient = require("mongodb").MongoClient; *is the same as below, except for the ObjectID*
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://172.18.1.26:27017/TodoApp", (err, client) => {
  if (err) {
    console.log("Unable to connect to mongodb server");
  } else {
    console.log("Connected to mongodb server.");
  }
  const db = client.db("TodoApp");

  // delete many
  // db.collection("Todos").deleteMany({text: "Have lunch"}).then((result) => {
  //   console.log(result.result);
  // });

  //delete one
  // db.collection("Todos").deleteOne({text: "Have lunch"}).then((result) => {
  //   console.log(result.result);
  // });

  // //findoneanddelete
  // db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

//1. look for duplicates, use deletemany to remove all those docs
  db.collection("Users").deleteMany({name: "Johann"}).then((results) => {
    console.log(`You just deleted ${results.result.n} documents.`); /*this just returns {n: x, ok:1} */
  });

//2. use findone to delete one other doc by ID
  db.collection("Users").findOneAndDelete({
    _id: new ObjectID("5ab8a932518ab7ae3cc8efd4")
  }).then((results) => {
    //console.log(JSON.stringify(results, undefined, 2));
    console.log(results);
  });

  // client.close();
});
