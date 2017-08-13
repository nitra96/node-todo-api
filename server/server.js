require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose }= require('./db/mongoose');
var {todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
//  console.log(req.body);

var toDo = new todo({
   text: req.body.text
});

toDo.save().then((doc) =>{
res.send(doc);
}, (e) =>{
res.status(400).send(e);
   });
});


app.get('/todos', (req, res)=>{
    todo.find().then((todos)=>{
      res.send({todos})
    }, (e) =>{
     res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) =>{
    var id = req.params.id;
if (!ObjectID.isValid(id)){
    return res.status(404).send();
}

todo.findById(id).then((todo) =>{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
},(e) => {res.status(400).send();
});
//    res.send(req.params);
});


//todo.findById(id).then((todo) =>{
//    if(!todo){
//       return console.log('Id not found');
//       }
//    console.log('Todo By ID', todo);
//}).catch((e) => console.log(e));

app.delete('/todos/:id', (req, res) =>{
    var id = req.params.id;
if(!ObjectID.isValid(id)){
    return res.status(404).send();
}
todo.findByIdAndRemove(id).then((todo) =>{
    if(!todo){
        return res.status(404).send();
    }
    res.status(200).send({todo});
}, (e)=>{res.status(400).send()
        });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)){
    return res.status(404).send();
}

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }


    todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((toDo) =>{
        if (!toDo) {
            return res.status(404).send();
        }
        res.send({toDo});

    }).catch((e) => {
        res.status(400).send();
    })
});

//*************USERS*****************//
//app.post('/users', (req, res) =>{
//    var newUser = new User({
//        email: req.body.email
//    });
//
//newUser.save().then((docs) =>{
//    res.send(docs);
//}, (e) =>{
//    res.status(400).send(e);
//});
//});
//
//app.get('/users',(req, res) =>{
//    User.find().then((users) =>{
//        res.sennd({users})
//    }, (e) =>{
//        res.status(400).send(e);
//    });
//});


app.listen(port, () =>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};





































//var newTodo = new todo({
//    text: 'To do something'
//});
//
//newTodo.save().then((doc) =>{
//   console.log('Saved todo');
//},(e) =>{
//    console.log('Unable to save todo');
//});

//var user = new todo({
//    text: 'fisa',
//    complete: true,
//    completedAt: 2.08.2017
//});
//
//user.save().then((doc) =>{
//    console.log('Saved user');
//}, (e) => {
//    console.log('Unable to save user');
//});
