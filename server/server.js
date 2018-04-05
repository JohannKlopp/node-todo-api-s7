//server.js is only responsible for our routes


//library imports
var express = require("express");
//bodyParser converts JSON into an object attaching it onto th "req"(uest) object
var bodyParser = require("body-parser");

//local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();

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
  })
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = {app};
