var PROMvalue = [[]];
var xhttp = new XMLHttpRequest();
var SendUrl = "send";
var lengthPROM = 4; //The length of the prom survey we wish

function sendPROM()
{
	console.log(PROMvalue.length);
	if(PROMvalue.length != lengthPROM) //If it's fine
	{
		console.log("PROM survey not fulfill");
	}
	else
	{
		var params = "value=";
		for(var i = 0; i < PROMvalue.length;i++) //check the length and add the prom value
		{
			params+=PROMvalue[i][0]+",";
		}
		params += "value=";
		for(var i = 0; i < PROMvalue.length;i++) //check the length
		{
			params+=PROMvalue[i][1]+",";
		}
		console.log(params);
		sendData(params);
	}
}

function sendData(params) //send the data of the prom survey. Have a single string in params
{
	xhttp.open("POST", SendUrl, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhttp.onload = function() {//Call a function when the state changes.
	        console.log(this.responseText)
	}
	xhttp.send(params); //Send the data. On the page '/Doctor_Dashboard/send'
}

function changeValue(nbQuestion, value)
{
	PROMvalue[nbQuestion] = [value,nbQuestion];
}