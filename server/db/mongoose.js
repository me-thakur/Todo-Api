var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //setup to use Promises
mongoose.connect('mongodb://localhost:27017/TodoApp'); //connected to mongodb database

module.exports = {mongoose}
