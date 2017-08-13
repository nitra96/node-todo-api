var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,

    }
});

//var newUser = new User({
//    email: 'some@example.com'
//});
//
//newUser.save().then((doc)=>{
//    console.log('user to save', doc);
//}, (e)=> {
//    console.log('Unable to save user');
//});

module.exports = {User};
