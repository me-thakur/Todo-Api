//library imports
var express = require('express');
var bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers


//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => { //save model to the database
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3001, () => {
  console.log('Started on port 3001');
});

module.exports = {app};
