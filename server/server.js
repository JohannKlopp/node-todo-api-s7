//server.js is only responsible for our routes
//library imports
var express = require("express");
//bodyParser converts JSON into an object attaching it onto th "req"(uest) object
var bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

//local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;

// Getting body data sent from the client
//With this I can send JSON data to my express application
app.use(bodyParser.json());

//CRUD operations on a database
//Create a resource: use POST http method and pass resource as the body
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
//Saving the new data to the db
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//API route for fetching an individual todo
app.get("/todos/:id", (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send("The id is not valid.");
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      res.status(404).send("No todo has this id.");
    }
    else {
      res.send({todo});
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
