var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //setup to use Promises
mongoose.connect(process.env.MONGODB_URI); //connected to mongodb database
mongoose.set('useCreateIndex', true);

module.exports = {mongoose}
