
require("./config/config");
//server.js is only responsible for our routes
//library imports
const _ = require("lodash");
const express = require("express");
//bodyParser converts JSON into an object attaching it onto th "req"(uest) object
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

//local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();
const port = process.env.PORT;

// Getting body data sent from the client
//With this I can send JSON data to my express application
app.use(bodyParser.json());

//CRUD operations on a database
//Create a resource: use POST http method and pass resource as the body

//APP POST
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

//APP GET ALL
app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//API route for fetching an individual todo
//APP GET ONE ITEM
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

//APP DELETE ONE ITEM
app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send("The id is not valid");
  }

  Todo.findByIdAndRemove(id).then((todo) => {

    if(!todo) {
      res.status(404).send("todo-id valid, but no todo has it.");
    }
    else {
      // var todo = JSON.stringify(result);

      // res.send(`This todo was just deleted and is no longer available:\n` + {result});
      res.send({todo});
    }
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send("The id is not valid");
  }

  if(_.isBoolean(body.completed) && body.completed) { // "&& body.completed" checks if "completed" is true, if so proceed
    body.completedAt = new Date().getTime(); //runs if cond. is a boolean and it is true
  }
  else {
    //runs if it is not a boolean or if it is not true
    body.completed = false; //also, everything'll eventually be updated by the model.
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((updatedTodo) => {
    if(!updatedTodo) {
      return res.status(404).send();
    }

    res.send({updatedTodo});

  }).catch((e) => {
    res.status(400).send();
  });
});

//POST /users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header("x-auth", token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
