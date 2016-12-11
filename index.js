var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express();
var path = require("path");
var request = require('request');

var d = new Date();
var h_hour = d.getUTCFullYear() +"/"+(d.getUTCMonth()+1)+"/"+d.getUTCDate()+"_"+d.getHours(); //Date format : YEAR/MONTH/DAY_HOUR


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

  //To get the html page
   app.get('/',function (req, res) {
    res.redirect('/pillar');
  });
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

  //send the data
  app.post('/sendprom',function (req, res) {
      var collection = db.collection('patient');
      //var id = req.body.id;
      var id = ObjectId("584c9e8395cee101f58028be");
      var value = req.body.value.split(",");
      var question = req.body.question.split(",");
      var answer = [h_hour];
      for(var i = 0; i < question.length;i++)
      {
          answer[i+1] = [value[i],question[i]];
      }
      collection.findOne({_id: id}).then(function(doc){
          var prom = doc.prom;
          prom[prom.length] = answer;
          collection.updateOne({_id: ObjectId("584c9e8395cee101f58028be")},
              { $set : { "prom" : prom }},
              {upsert: true}).catch(function()
          {
              console.log("erreur");
          });
      }, function(err)
      {
          console.log(err);
      });
      /*db.collection('patient').save({_id: ObjectId("1"),
       "name" : "me",
       "prom" : [
       ["2016/5/3_16",["false","0"],["true","1"],["true","2"],["4","3"]],
       ["2016/5/3_16",["true","0"],["true","1"],["false","2"],["4","3"]]],
       "fitbitdata":[
       ["2016/5/3_15",["name",56,7],["name",56,7]],
       ["2016/5/3_15",["name",56,7],["name",56,7]]]
       });*/
  });


});



app.listen(3000, function () {
  console.log('Listening on port 3000!')
});