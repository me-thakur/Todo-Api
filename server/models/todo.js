var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //remove leading and traling spaces
  },
  completed: {
    type: Boolean,
    default: false //set a default value
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};




























// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// var otherTodo = new Todo({
//    text: 'Todo entry'
//   // completed: true,
//   // completedAt: 123
// });
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });//saving to the mongodb database
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo');
// });
