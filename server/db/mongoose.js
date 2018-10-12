var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //setup to use Promises
mongoose.connect(process.env.MONGO_URI); //connected to mongodb database

module.exports = {mongoose}
