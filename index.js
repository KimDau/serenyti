var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express();
var path = require("path");
var request = require('request');
var last = "last"; //Value for the last PROM survey


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

  //send each PROM survey to the mongodb database
  app.post('/sendprom',function (req, res) {
      var collection = db.collection('patient');
      var id = ObjectId(req.body.id);
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
          collection.updateOne({_id: id},
              { $set : { "prom" : prom }},
              {upsert: true}).catch(function(err) {console.log(err);});
      }, function(err) {console.log(err);});
  });

  //get one PROM survey from the mongodb database
  app.post('/getprom',function (req, res) {
      var result;
      var id = ObjectId(req.body.id);
      var dateChosen = req.body.date;
      var collection = db.collection('patient');
      collection.findOne({_id: id}).then(function(doc)
      {
          if(dateChosen == last)
          {
              result  = doc.prom[0];
          }
          res.send(result);
      }, function(err){console.log(err);});
    });
    app.get('/insert',function(req,res)
    {
        var collection = db.collection('patient');
        collection.save({
            "_id" : ObjectId("584c4e8595cee101f58028be"),
            "name" : "vous",
            "problem" : "true",
            "prom" : [
                ["2016/12/11_20", ["yes", "0"], ["no", "1"], ["no", "2"], ["yes", "3"], ["2", "4"]],
                ["2016/12/11_20", ["no", "0"], ["yes", "1"], ["no", "2"], ["yes", "3"], ["2", "4"]],
                ["2016/12/11_20", ["no", "0"], ["yes", "1"],["no", "2"], ["yes", "3"], ["2", "4"]]],
            "fitbitdata" : [
                ["2016/5/3_15",
                    ["name", 56, 7],
                    ["name", 56, 7]],
                ["2016/5/3_15",
                    ["name", 56, 7],
                    ["name", 56, 7]]]
        });
        res.redirect('/dashboard');
    });
});




app.listen(8080, function () {
  console.log('Listening on port 3000!')
});
