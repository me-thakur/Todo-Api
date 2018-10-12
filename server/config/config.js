var env = process.env.NODE_ENV || 'development';

if (env =='development') {
  process.env.PORT = 3001;
  process.env.MONGO_URI = 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true };
} else if (env =='test') {
  process.env.PORT = 3001;
  process.env.MONGO_URI = 'mongodb://localhost:27017/TodoAppTest', { useNewUrlParser: true }
}
