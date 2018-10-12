const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(remove);
// });


//Todo.findOneAndRemove
Todo.findByIdAndDelete('5bc074563c245253414a74c6').then((todo) => {
  console.log(todo);
  });
