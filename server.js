// server.js

/////////////// SETUP //////////////

const express = require('express');
const app = express();
app.use(express.static('public'));

//var bodyParser = require('body-parser')
app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


////////////// DATABASE ////////////////////

var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// To delete user database, uncomment this: 
//db.serialize(function(){db.run('drop table Users;')})
// if ./.data/sqlite.db does not exist, create it, otherwise print records to console

db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Users (Username TEXT UNIQUE NOT NULL CHECK(length(Username)<25 AND length(Username)>3), Password TEXT NOT NULL CHECK(length(Password)<25 AND length(Password)>6))');
    console.log('New table Users created!');
    
    // insert default users
    db.serialize(function() {
      db.run('INSERT INTO Users (Username, Password) VALUES ("gamer99", "1234"), ("ninja", "haxor"), ("loganpaul", "bruh");');
    });
  }
  else {
    console.log('Database "Users" ready to go!');
    db.each('SELECT * from Users', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      } 
      if ( err ) {
        console.log('error: ', err);
      }
    });
  }
});


//////////////////////// ROUTES ////////////////////////////

// login //////////
app.get('/login', function(req, res) {
  console.log('get req to /login')
  if (req.query.username == 'gamer99' && req.query.password == '1234') {
    res.redirect('/main');
  } else {
    res.send('Incorrect username or password!')
  }
});

// main menu /////////////
app.get('/main', function(req, res) {
  console.log('get req to /main')
  res.sendFile(__dirname + '/views/main.html');
});

// register account ////////////
// load the html page
app.get('/register', function(req,res) {
  console.log('get req to /register')
  res.sendFile(__dirname + '/views/register.html');
});
// endpoint for creating a new account
app.post('/register', function(req,res) {
  var un = req.body.username;
  var pw = req.body.password;
  console.log('post req to /register');
  console.log('username = ' + un);
  console.log('password = ' + pw);
  db.serialize(function() {
      db.run('INSERT INTO Users (Username, Password) VALUES ("' + un + '", "' + pw + '");', function(err) {
        if (err) {
          console.log('un lenght = ' + un.length)
          if (un.length < 3) {
            res.send('Error: Username cannot be less than 3 characters.')
          } else
          if (pw.length < 6) {
            res.send('Error: Password cannot be less than 6 characters.')
          } else 
          if (un.length > 25) {
            res.send('Error: Username cannot be more than 25 characters.')
          } else 
          if (pw.length > 25) {
            res.send('Error: Password cannot be more than 25 characters.')
          } else { // username already taken
            res.send('Error: That username is already taken!')
          }
        } else {
          // no error: New account created. 
          res.redirect('/main')
        }
      });
    });
});

///////////////////////// RUN SERVER //////////////////////////////

// listen for requests
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
