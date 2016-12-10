// Retrieve
var MongoClient = require('mongodb').MongoClient;
var express = require('express')
var app = express()
var path = require("path");
var request = require('request');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Pillar", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

function sendRequest()
{
	console.log("test");
}

app.use('/Doctor_Dashboard', express.static(__dirname + '/Doctor_Dashboard'));
app.use('/Page_Pillar', express.static(__dirname + '/Page_Pillar'));

app.get('/Page_Pillar').then(function (req, res) {
  res.sendFile(path.join(__dirname+'/Page_Pillar/index.html'));
})
app.get('/Doctor_Dashboard/login.html', function (req, res) {
  res.sendFile(path.join(__dirname+'/Doctor_Dashboard/login.html'));
})
app.get('/Doctor_Dashboard/dashboard.html', function (req, res) {
  res.sendFile(path.join(__dirname+'/Doctor_Dashboard/dashboard.html'));
})
app.post('/Doctor_Dashboard/dashboard.html', function (req, res) {
  res.sendFile(path.join(__dirname+'/Doctor_Dashboard/dashboard.html'));
})
app.get('/Doctor_Dashboard/tasks.html', function (req, res) {
  res.sendFile(path.join(__dirname+'/Doctor_Dashboard/tasks.html'));
})
aap.post('/send')



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
