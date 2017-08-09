const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//todo.remove({}).then((result) =>{
//    console.log(result);
//});

//todo.findOneAndRemove({_id: '598b23bee0fd60204b6b2a7d'}).then((doc) =>{
//  console.log(doc)    
//});


todo.findByIdAndRemove('598b2358e0fd60204b6b2a47').then((todo) =>{
  console.log(todo)  
});