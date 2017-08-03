var express = require('express');
var bodyParser = require('body-parser');


var {mongoose }= require('./db/mongoose');
var {todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//app.post('/todos', (req, res) =>{
////  console.log(req.body);
//
//var toDo = new todo({
//   text: req.body.text 
//});
//
//toDo.save().then((doc) =>{
//res.send(doc);  
//}, (e) =>{
//res.status(400).send(e);
//   }); 
//});


app.post('/todos', (req,res) =>{
     
var someNew = new todo({
        text: req.body.text
});
someNew.save().then((docs) =>{
   res.send(docs);
}, (e) =>{
res.status(400).send(e);    
});  
});

app.listen(3000, () =>{
    console.log('Starter on port 3000');
});





































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

