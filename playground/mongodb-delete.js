//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
     if(err){
       return  console.log('Unable to connect to MongoDB server');
     }
    console.log('Connected to MongoDB server');
  
deleteMany
db.collection('Todos').deleteMany({text:'eat lunch'}).then((result) =>{
    console.log(result);
});    
    
    
//deleteOne
//db.collection('Todos').deleteOne({text:'eat lunch'}).then((result) => {
//console.log(result);    
//});

    
//findOneAndDelete    
//db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
//console.log(result);    
//});    
    
//db.collection('Users').deleteMany({name:'fisa'}).then((result) =>{
//    console.log(result);
//})
    
 
//db.collection('Users').findOneAndDelete({_id: new ObjectID("597f21fec1a57b2d2cbbd553")}).then((result) => {
//    console.log(JSON.stringify(result, undefined, 2));
//})    
    
//db.close(); 
});