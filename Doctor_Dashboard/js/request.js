var PROMvalue = [[]];
var xhttp = new XMLHttpRequest();
var sendPromUrl = "/sendprom";
var getPromUrl = "/getprom";
var lengthPROM = 5; //The length of the prom survey we wish

function changeValue(nbQuestion, value) //Change the value of the prom survey
{
    PROMvalue[nbQuestion] = [value,nbQuestion];
    //If possible add the function which darken the button
}

function sendPROM()
{
	console.log("answer question = " + PROMvalue.length);
	if(PROMvalue.length != lengthPROM) //If it's fine
	{
		console.log("PROM survey not fulfill");
	}
	else
	{
		var params = "id="+id+"&value=";
        params+=PROMvalue[0][0]; //For don't having the "," on the last character
		for(var i = 1; i < PROMvalue.length;i++) //check the length and add the prom value
		{
			params+=","+PROMvalue[i][0];
		}
		params += "&question=";
        params+=PROMvalue[0][1];//For don't having the "," on the last character
        for(var i = 1; i < PROMvalue.length;i++) //check the length
		{
			params+=","+PROMvalue[i][1];
		}
		sendData(params, sendPromUrl);
	}
}

function sendData(params, url) //send the data of the prom survey. Have a single string in params
{
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onload = function() {//Call a function when the state changes.
	        console.log(this.responseText)
	};
	xhttp.send(params); //Send the data. On the page '/Doctor_Dashboard/send'
}

function getProm(idPatient, dateChosen)
{
    var prom = new Promise(function(resolve, reject) //send the data of the prom survey. Have a single string in params
    {
        xhttp.open("POST", getPromUrl, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onload = function() {//Call a function when the state changes.
            resolve(TransformProm(this.responseText));
        };
        xhttp.send("id="+idPatient+"&date="+dateChosen); //Send the data. On the page '/Doctor_Dashboard/send'
    });
    return prom;
}

function TransformProm(text)
{
    var temp = text.split('"');
    var j = 1;
    var result = [[]];
    result[0]=temp[1];
    for(var i =3; i < temp.length;i+=4)
    {
        result[j]= [temp[i],temp[i+2]];
        j++;
    }
    return result;
}