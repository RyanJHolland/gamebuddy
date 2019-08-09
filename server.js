// server.js

/////////////// SETUP //////////////

const express = require('express');
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
var bodyParser = require('body-parser')

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


////////////// DATABASE ////////////////////

var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Users (username TEXT), (password TEXT)');
    console.log('New table Users created!');
    
    // insert default users
    db.serialize(function() {
      db.run('INSERT INTO Users (username, password) VALUES ("gamer99", "1234"), ("ninja", "haxor"), ("loganpaul", "bruh");');
    });
  }
  else {
    console.log('Database "Users" ready to go!');
    db.each('SELECT * from Users', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});


//////////////////////// ROUTES ////////////////////////////

// login page
app.get('/login', function(req, res) {
  console.log('get req to /login')
  if (req.query.username == 'gamer99' && req.query.password == '1234') {
    res.redirect('/main');
  } else {
    res.send('Incorrect username or password!')
  }
});

// main menu
app.get('/main', function(req, res) {
  console.log('get req to /main')
  res.sendFile(__dirname + '/views/main.html');
});

// register page
app.get('/register', function(req,res) {
  console.log('get req to /register')
  res.sendFile(__dirname + '/views/register.html');
});
    app.post('/register', function(req,res) {
      console.log('post req to /register')
      
    });

///////////////////////// RUN SERVER //////////////////////////////

// listen for requests
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
