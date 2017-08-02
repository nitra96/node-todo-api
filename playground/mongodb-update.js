//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
     if(err){
       return  console.log('Unable to connect to MongoDB server');
     }
    console.log('Connected to MongoDB server');
 
//db.collection('Todos').findOneAndUpdate({
//    _id: new ObjectID('598181242833f764233b8363')
//},{
//$set: { 
//completed: true}    
//},{ returnOriginal: false})
//    .then((result)=> {
//    console.log(result);
//});    
//  

db.collection('Users').findOneAndUpdate({
 _id: new ObjectID('597f21ebd45ffe2d2b0dd473')
},{
 $inc: {
     age: 1
 },
$currentDate: {
    lastModified: true,
    "date": { $type: "date"}
},
$mul: {
    price: 2
}
    
}, {returnOriginal: true}).then((result) =>{
    console.log(result);
});    
    
    
   
    
    
//db.close(); 
});