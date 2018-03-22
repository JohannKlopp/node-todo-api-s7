// const MongoClient = require("mongodb").MongoClient;
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
  db.collection("Users").deleteMany({name: "Johann Klopp"}).then((result) => {
    console.log(result.result);
  });

//2. use findone to delete one other doc by ID
  db.collection("Users").findOneAndDelete({
    _id: new ObjectID("5ab26824fbe41c268e24a8e6")
  }).then((result) => {
    console.log(result);
  });

  // client.close();
});
