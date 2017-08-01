//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
     if(err){
       return  console.log('Unable to connect to MongoDB server');
     }
    console.log('Connected to MongoDB server');
//  
//db.collection('Todos').find({
//    _id:new ObjectID('597dcb23ae90f32be3a93fe3')
//}).toArray().then((docs) =>{
//   console.log('Todos');
//   console.log(JSON.stringify(docs, undefined, 2));
//}, (err) =>{
//    console.log('Unable to fetch todos', err);
//});
//    
//    
////db.close();    
//});

//db.collection('Todos').find().count().then((count) =>{
//   console.log(`Todos count: ${count}`);
//}, (err) =>{
//    console.log('Unable to fetch todos', err);
//});
//    
//    
////db.close();    
//});
    
db.collection('Users').find({
    name:'fisa'
}).toArray().then((docs) =>{
    console.log('User');
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) =>{
    console.log('Unable to fetch User', err);
  });
});
    
    
    
    
    
    