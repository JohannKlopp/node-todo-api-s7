const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://172.18.1.26:27017/TodoApp", (err, client) => {
  if (err) {
    console.log("Unable to connect to mongodb server");
  } else {
    console.log("Connected to mongodb server.");
  }
  const db = client.db("TodoApp");

  // db.collection("Todos").findOneAndUpdate({
  //   _id: new ObjectID("5ab36dc6ece7b4f861df85a0")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection("Users").findOneAndUpdate({
    _id: new ObjectID("5ab8a936518ab7ae3cc8efd7")
  }, {
    $set: {
      name: "Giorgio",
      location: "Phoenix"
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //db.close();
});
