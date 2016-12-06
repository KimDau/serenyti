var CookieName = ["username","password"]; //The value to make on the cookie (to add on the code)
var ExpirationTime = 1; //1 day

function setCookie(username, password) { //Create cookie
    var d = new Date();
    d.setTime(d.getTime() + (ExpirationTime*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = CookieName[0] + "=" + username + ";";
    document.cookie = CookieName[1] + "=" + password +";";
    document.cookie = expires;
    document.cookie = "path=/;";
    //Impossible de les crées tous en même temps
    }

function getCookie(cname) { //Permit acces to the cookie
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function IsTheGoodPassword(username,password) { //Check the password, into the cookie (TO MODIFY)
    var userpassword = getCookie(CookieName[1]);
    var usernameC = getCookie(CookieName[0]);
    var result = true;
    console.log("username : " + usernameC + " vs " + username + " & userpassword : " + userpassword + " vs " + password);
    if ((usernameC =="" || userpassword =="") && password != "" && username != "") 
       {
            setCookie(username,password);
       }
    else
       {
            if(userpassword != password || usernameC != username)
            {
                result = false;
            }
       }
    return result;
}

$(document).ready(function(){ //check the document changes
    $("form").on("submit", function(event){ //On the form submit
        var User = $( this ).serializeArray();
        var result =  IsTheGoodPassword(User[0].value,User[1].value); //Return to the index page if you have the right name
        if(!result)
        {
            var wrong = document.getElementById("wrong");
            wrong.innerHTML = "Wrong password";
        }
        return result;
    });
});


function CheckConnected() //Verify if you are connected
{ 
    var username = getCookie(CookieName[0])
    console.log("connected = " + username); //Let you know on the console that you are connected
    if(username ==undefined || username=="") {
        location.href = "login.html"; //Return to the login html if your aren't connected
    }
    else
    {
        var name = document.getElementById("username");
        name.innerHTML = username;
    }
}