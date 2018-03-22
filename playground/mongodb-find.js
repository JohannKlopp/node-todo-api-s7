// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://172.18.1.26:27017/TodoApp", (err, client) => {
  if (err) {
    console.log("Unable to connect to mongodb server");
  } else {
    console.log("Connected to mongodb server.");
  }
  const db = client.db("TodoApp");

  db.collection("Todos").find({
    _id: new ObjectID("5ab370adece7b4f861df866a")
  }).toArray().then((docs) => {
    console.log("Todos");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch Todos", err);
  });

  // db.collection("Todos").find().count().then((count) => {
  //   console.log(`Todos count:${count}`);
  // }, (err) => {
  //   console.log("Unable to fetch Todos", err);
  // });

  // db.collection("Users").find({name: "Johann Klopp"}).toArray().then((docs) => {
  //   console.log("Users");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to fetch Users", err);
  // });

  // client.close();
});
