var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
// /list is pointing to database name
mongoose.connect('mongodb://localhost/list');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  title: String,
  description: String,
  is_done: Boolean,
  created_at: Date
});
// lets you save and get find() todos
var ToDo = mongoose.model('todo', toDoSchema);



// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  // res.render('index');
  // function
  ToDo.find(function(err, lists){
    if (err) throw err;
    // IDK
    console.log(lists);
    res.render('index', { userlist : lists });
  });

});

app.get('/new_item', function (req, res) {
  res.render('new_item');
});

// Reads in the server console logs {} objects
app.post('/new_item', function (req, res) {
  console.log(req.body);

  var newToDo = new ToDo({
    title: req.body.title,
    description: req.body.description,
    is_done: false,
    created_at: new Date()
  });
  console.log(newToDo);
  newToDo.save(function (err){
    if (err) {
      throw err;
    }
    console.log('saved');
  });
});

app.get('/edit_item', function (req, res) {
  res.render('edit_item');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});