// to make assertions, i.e. it("should throw an error")
const expect = require("expect");
//to test the express routes
const request = require("supertest");

//local files
const {app} = require("./../server");
const {Todo} = require("./../models/todo");

beforeEach((done) => {
  Todo.remove({}).then(() => done());
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
        Todo.find().then((todos) => {
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
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
