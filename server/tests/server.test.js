// to make assertions, i.e. it("should throw an error")
const expect = require("expect");
//to test the express routes
const request = require("supertest");
const {ObjectID} = require("mongodb");

//local files
const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
  _id: new ObjectID(),
  text: "First test todo"
}, {
  _id: new ObjectID(),
  text: "Second test todo",
  completed: true,
  completetAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos); // "return" allows me to chain callbacks (.then())
  }).then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    var text = "Test todo text.";

    //test if what was sent as "text", comes back as "text" + the right error code
    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //test if what landed in the db is the same as "text"
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it("should not create todo with invalid body data", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc", (done) => { //async test so "done" arg is specified
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  })

  it("should return 404 if todo not found", (done) => {
    //make req using real objectid, call its .toHexString method
    //make sure you get a 404 back
    var testObjectId = new ObjectID();
    request(app)
      .get(`/todos/${testObjectId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return a 404 for non-object-ids", (done) => {
    // /todos/123
    //make sure 404 is status code
    request(app)
      .get("/todos/123abc")
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () =>{
  it("should remove a todo", (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        //query db using findById, that has the hexid, it should fail .toNotExist
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));

      });
  });

  it("should return 404 if todo not found", (done) => {
    var testObjectId = new ObjectID();
    request(app)
      .delete(`/todos/${testObjectId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 if the object id is invalid", (done) => {
    request(app)
      .delete("/todos/123abc")
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("should update the todo (from false to true + set new text)", (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "This should be the new text";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => { // assertions about the data coming back
        expect(res.body.updatedTodo.text).toBe(text);
        expect(res.body.updatedTodo.completed).toBe(true);
        expect(res.body.updatedTodo.completedAt).toBeA("number");
      })
      .end(done);
  });

  it("should update todo from true to false + autom. wipe completedAt + set new text", (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = "This should be the new text (2nd test)!!";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => { // assertions about the data coming back
        expect(res.body.updatedTodo.text).toBe(text);
        expect(res.body.updatedTodo.completed).toBe(false);
        expect(res.body.updatedTodo.completedAt).toNotExist();
      })
      .end(done);
  });
});
