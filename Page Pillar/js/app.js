var accounts;
var accountID = 0;

function initialisation()
{
  var dem= Vote.deployed();
   var des="La mairie de Paris va t elle nous répondre un jour ? "
  dem.addProposal(des,{from:account}).then(function(){
   console.log("proposal émise");
 }).catch(function(e){
  console.log("erreur");
  console.log(e);
});
getInfo();
}

function getInfo()
{
  var dem=Vote.deployed();
  dem.getIndex().then(function(rslt){
    var i = rslt.toString(10)-1 ;
    console.log("la proposition est la numéro"+i);
  dem.proposals(i).then(function(result){
  console.log(result);
  document.getElementById("des").innerHTML=result[0];
    // document.getElementById("time").innerHTML=result[2].toString(10);
  document.getElementById("numbervote").innerHTML=result[4].toString(10);
  getTime(i);
  });
  });
}

function getTime(i)
{
  var dem=Vote.deployed();
  dem.getTimeExpected(i).then(function(rslt){
console.log(rslt.toString(10));
document.getElementById("time").innerHTML = rslt.toString(10);
decompte();
  });
}

 function vote()
    {
     var dem = Vote.deployed(); 
  var name = document.getElementById("nameBadge").value;
  var opt;
 if (document.getElementById('r1').checked) {
  opt=1;
}
 if (document.getElementById('r2').checked) {
 opt=2;
}
 if (document.getElementById('r3').checked) {
 opt=3;
}
console.log(opt);
console.log(name);
     dem.vote(opt,name, {from: account}).then(function(rslt) {
      getTicket(rslt,name);
      console.log("vote émis"+ rslt);
    }).catch(function(e) {
      console.log(e);
    });
refreshVote();
  }

function getTicket(rslt,name)
{
  var objTo = document.getElementById('histo')
  var tempElement = document.createElement('div');
  var time = new Date();
time=time.toUTCString();
tempElement.innerHTML = '<div class="row"><div class="col-md-8 col-md-offset-2"><div class="panel panel-default"><div class="panel-body">'
+"<b>Badge : </b>"+name+"<br>"+
"<b>Hash de la transaction : </b>"+rslt+"<br>"+
"<b>Date de la transaction : </b>"+time+"<br>"+
'</div></div></div></div>';
objTo.appendChild(tempElement.firstChild);
}

function refreshVote()
{
  var dem=Vote.deployed();
  dem.getIndex().then(function(rslt){
    var i = rslt.toString(10)-1 ;
  dem.proposals(i).then(function(result){
  document.getElementById("numbervote").innerHTML=result[4].toString(10);
  });
  });
}

function decompte()
{
var compteur = document.getElementById("time").innerHTML;
// console.log(compteur);
compteur--;
document.getElementById("time").innerHTML = compteur;
if(compteur == 0)
{
  alert("cette session de vote est terminé ! Attezndez la suivante");
toCloseAndreload()
}
else{
setTimeout('decompte()',1000);
}
}

function toCloseAndreload()
{
  var dem=Vote.deployed();
  dem.Close({from: account}).then(function(rslt) {
console.log("proposition fermée");
getWinner()
// graphe
  });
}
function getWinner()
{
    var dem=Vote.deployed();
  dem.executeProposal({from: account}).then(function(rslt) {
console.log("done");
  });
  dem.getIndex().then(function(rslt){
    var i = rslt.toString(10)-1 ;
    console.log("la proposition est la numéro"+i);
  dem.proposals(i).then(function(result){
  console.log("object 5" +result[5].toString(10));
   console.log("object 6" +result[6].toString(10));
   console.log("object 7" +result[7].toString(10));
   getGraph();
  });
  });
}

function getGraph()
{
 var dem=Vote.deployed();
  dem.getIndex().then(function(rslt){
    var i = rslt.toString(10)-1 ;
    console.log("la proposition  graph est la numéro"+i);
  dem.proposals(i).then(function(result){

console.log(result[5].toString(10));
console.log(result[6].toString(10));
console.log(result[7].toString(10));

var op1 = result[5].toString(10);
var op2 = result[6].toString(10);
var op1 = result[7].toString(10);


      $(document).ready(function(){
        $.jqplot.config.enablePlugins = true;

        var s1 = [op1,op2,op3];
        var ticks = ['op1', 'op2','op3'];
        plot1 = $.jqplot('graphe', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
              renderer:$.jqplot.BarRenderer,
              pointLabels: { show: true },
               rendererOptions: {
      
                varyBarColor: true
            }
            },
            axes: {
              xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
                
              },
              yaxis: {
               min:0,
               max:15
              },
            },
        
            highlighter: { show: false }
          });

        $('#graphe').bind('jqplotDataClick', 
          function (ev, seriesIndex, pointIndex, data) {
            $('#graphe').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
          }
          );
        // plot1.axes.yaxis.max = 10;
        plot1.redraw();
      });
        });
  });
};



//   function voteNegatif()
//   {
//    var dem = democracy.deployed();
//    var index=document.getElementById("voteId").value;

//    dem.vote(index, false, {from: account}).then(function() {
//     getevent();
//     // getGraph();
//     console.log("vote Negatif émis");
//   }).catch(function(e) {
//     alert("Vous avez déja voté");
//     console.log(e);
//   });
// };


// function addProposal()
// {
//   var dem=Vote.deployed();
//  var des="Exemple de choix de la mairie de paris"
//   dem.addProposal(des,{from:account}).then(function(){
//    console.log("proposal émise");
//  }).catch(function(e){
//   console.log("erreur");
//   console.log(e);
// });

// }
// };

// function getevent()
// {

//   var dem = Vote.deployed();
//   var myEvent = Vote.voteEvent({}, {});
//   console.log(myEvent);
//  myEvent.watch(function(error, result){
//   console.log(result);
// var HTMLaddress = result.args._address.toString(10);
// var HTMLBlock = result.blockNumber;
// var HTMLChoix=result.args._choix;
// var time = new Date();
// time=time.toUTCString();
// if(HTMLChoix ==true)
// {
//   HTMLChoix="Positif";
// }else{HTMLChoix="Negatif";}
// // HtmlIndex= result.args._index.c.0;
// console.log("Param Address : "+HTMLaddress);
// console.log("Param block : "+HTMLBlock);
// console.log("Param choix : "+HTMLChoix);
// console.log(time);
// // console.log("Param index : "+HtmlIndex);
// getHtml(HTMLaddress,HTMLBlock,HTMLChoix,time);
// console.log("vote : "+result.args._address.toString(10));
//   // var truc=document.getElementById("events");
//   // truc.innerHTML.join("vote : "+result.args._address.toString(10));
//   // truc.innerHTML.join("<br>");
// });
// //   var myResults = myEvent.get(function(error, logs){ console.log(logs.toString(10));});
// // console.log(myResults);

//   // var event = dem.voteEvent(function(error, result) {
//   //   if (!error)
//   //     document.getElementById("events").innerHTML = "event"+result; 
//   // });
// };
// function getHtml(address,block,choix,date)
// {
// var tempElement = document.createElement('div');
// tempElement.innerHTML = '<div class="row"><div class="col-md-8 col-md-offset-2"><div class="panel panel-default"><div class="panel-body">'
// +"Clé de l'envoyeur : "+address+"<br>"+
// "Block de la transaction : "+block+"<br>"+
// "choix éffectué : "+choix+"<br>"+
// "Date de la transaction "+date+"<br>"+
// '</div></div></div></div>';
// // tempElement.innerHTML += '<div class="col-md-8 col-md-offset-2">'
// // tempElement.innerHTML += html;
// // tempElement.innerHTML += '</div></div>'
// document.getElementsByTagName('body')[0].appendChild(tempElement.firstChild);
// myEvent.stopWatching();
// };



// function executeProposal() {
//   var dem = democracy.deployed();
//   var proposalId = document.getElementById('executeProposalIdField').value;
//   dem.executeProposal(proposalId, {from: web3.eth.coinbase}).then(function(res) {
//     console.log(res);
//   })
//   getGraph();
// };

// function toClose()
// {
//   var dem = Vote.deployed();
//   var proposalID = document.getElementById('proposalsIDClose').value;
//   console.log(proposalID);
//   dem.Close(proposalID);
// };

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[accountID];
getInfo();

  });
};
