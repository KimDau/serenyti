var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require("path");
var request = require('request');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Pillar", function(err, db) {
  if(!err) {
    console.log("Connected to the Pillar database");
  }

  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  //To get the html/css/js on the folder /Doctor_Dashboard and /Page_Pillar
  app.use('/Doctor_Dashboard', express.static(__dirname + '/Doctor_Dashboard'));
  app.use('/Page_Pillar', express.static(__dirname + '/Page_Pillar'));

  //To send on the good page. Name can be change as we wish

  app.get('/pillar',function (req, res) {
    res.sendFile(path.join(__dirname+'/Page_Pillar/index.html'));
  });
  app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname+'/Doctor_Dashboard/login.html'));
  });
  app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname+'/Doctor_Dashboard/dashboard.html'));
  });
  app.post('/dashboard', function (req, res) {
    res.redirect('/dashboard');
  });
  app.get('/tasks', function (req, res) {
    res.sendFile(path.join(__dirname+'/Doctor_Dashboard/tasks.html'));
  });

  //receiver
  app.post('/send',function (req, res) {
    var value = req.body.value;
    var question = req.body.question;
    db.collection("patient").insertOne({
      name:"test"
    });
  });


});



app.listen(3000, function () {
  console.log('Listening on port 3000!')
});