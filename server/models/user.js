var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {User};







// var newUser = new User({
//   email: {
// type: String,
// required: true
// }
// });
//
// var newUser = new User({
//    email: 'thakurvivek1296@gmail.com'
//   // completed: true,
//   // completedAt: 123
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Email is required');
// });
