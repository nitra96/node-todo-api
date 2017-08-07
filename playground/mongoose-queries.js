const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '59883ed86bad91421008f52411';
//
//if (!ObjectID.isValid(id)){
//    console.log('ID not valid');
//}
////todo.find({
////    _id: id
////}).then((todos) => {
////    console.log('Todos', todos);
////});
////
////todo.findOne({
////_id: id          
////}).then((todo) =>{
////    console.log('Todo', todo);
////});
//
//todo.findById(id).then((todo) =>{
//    if(!todo){
//        return console.log('Id not found');
//    }
//    console.log('Todo By ID', todo);
//}).catch((e) => console.log(e));
// 
var id = '598319c66c21d9353f196174';
User.findById(id).then((user) =>{
    if(!User){
        return console.log('User not found');
    }
    console.log('User by Id', user)
}).catch((e) => console.log(e));

