const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID() ,
    text: 'Second test todo',
    completed: true ,
    completedAt: 2121
}];

beforeEach((done) =>{
    todo.remove({}).then(() =>{
     return todo.insertMany(todos);
    }).then(() =>done());

//todo.remove({}).then(() => done());

});

describe('POST /todos', () =>{
   it('should create new todo', (done) =>{
    var text = 'test text for todo';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
        expect(res.body.text).toBe(text);
    })
    .end((err, res) =>{
        if (err) {
            return done(err);
        }

    todo.find({text}).then((todos) =>{
       expect(todos.length).toBe(1);
       expect(todos[0].text).toBe(text);
       done();
    }).catch((e) => done(e));
    });
});

    it('should not create todo with invalid body data', (done) =>{

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) =>{
            if(err){
                return done(err);
            }

        todo.find().then((todos) =>{
            expect(todos.length).toBe(2);
            done();
        }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () =>{
   it('Should get all todos', (done) =>{

     request(app)
       .get('/todos')
       .expect(200)
       .expect((res) =>{
         expect(res.body.todos.length).toBe(2);
     })
       .end(done);
   });
});

describe('GET /todos/:id', () =>{
    it('Should return todo doc', (done) =>{

        request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`)
         .expect(200)
         .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
         .end(done);
    });

    it('Should return 404 if todo not found', (done) =>{

//        request(app)
//         .get('/todos/_id.toHexString()')
//         .expect(404)
//         .end(done);
//
    var hexId = new ObjectID().toHexString();
        request(app)
         .get(`/todos/${hexId}`)
         .expect(404)
         .end(done);

    });

    it('Should return 404 for non-object ids', (done) =>{

        request(app)
         .get('/todos/123')
         .expect(404)
         .end(done);
    });
});

describe('DELETE /todos/:id', () =>{
    it('Should remove a todo', (done) =>{

 var hexId = todos[1]._id.toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) =>{
          expect(res.body.todo._id).toBe(hexId);
      })
        .end((err, res) =>{
          if (err) {
              return done(err);
          }
    todo.findById(hexId).then((todo) =>{
        expect(todo).toNotExist();
        done();
        }).catch((e) => done(e));
      });
    });

    it('Should return 404 if todo not found',(done) =>{
var hexId = new ObjectID().toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);

    });

    it('Should return 404 if object id is invalid', (done)=>{
       request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {

 it('Should update todo', (done) => {

 var hexId = todos[0]._id.toHexString();
 var text = 'This must be the new text';

 request(app)
  .patch(`/todos/${hexId}`)
  .send({
    completed: true,
    text: text
  })
  .expect(200)
  .expect((res) =>{
    expect(res.body.toDo.text).toBe(text);
    expect(res.body.toDo.completed).toBe(true);
    expect(res.body.toDo.completedAt).toBeA('number');

  })
  .end(done);
 });


 it('Should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'This must be the new text!!';

    request(app)
     .patch(`/todos/${hexId}`)
     .send({
       completed: false,
       text: text
     })
     .expect(200)
     .expect((res) =>{
       expect(res.body.toDo.text).toBe(text);
       expect(res.body.toDo.completed).toBe(false);
       expect(res.body.toDo.completedAt).toNotExist();

     })
     .end(done);
    });
});
