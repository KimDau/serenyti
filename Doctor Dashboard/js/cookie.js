var CookieName = ["username","password","usertype"]; //The value to make on the cookie (to add on the code)
//usertype 0 = doctor usertype 1 = patient
var YouAreADoctor = undefined; //Test if it's a doctor
var doctor = getCookie("usertype"); //Know if it's the doctor
var ExpirationTime = 24; //24 hours

function setCookie(value) { //Create cookie
    var d = new Date();
    d.setTime(d.getTime() + (ExpirationTime*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = CookieName[0] + "=" + value[0] + ";";
    document.cookie = CookieName[1] + "=" + value[1] +";";
    document.cookie = CookieName[2] + "=" + value[2] +";";
    document.cookie = expires;
    document.cookie = "path=/;";
    //Impossible to create all a the same times
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
    console.log("username : " + usernameC + " vs " + username + " & userpassword : " + userpassword + " vs " + password + " doctor : " + doctor +" vs " + YouAreADoctor);
    if ((usernameC =="" || userpassword =="") && password != "" && username != "") 
       {
            var cookievalue = [username,password,doctor];
            setCookie(cookievalue);
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
        event.preventDefault();
        var User = $( this ).serializeArray();
        var result = false;
        var wrong = document.getElementById("wrong");
        var message = "";
        if(doctor == undefined)
        {
            doctor = YouAreADoctor;
        }
        else
        {
            var result =  IsTheGoodPassword(User[0].value,User[1].value); //Return to the index page if you have the right name
            if(!result)
            {
                message += "Wrong password ! ";
            }
            if(doctor != YouAreADoctor)
            {
                result = false;
            }
        }
        wrong.innerHTML = message;
        console.log("enter ? " + result);
        if(result){
            if(doctor)
            {
                location.href = "dashboard.html";
            }
            else
            {
                location.href = "tasks.html";
            }
        }
    });
});

function IsADoctor(YesOrNO) //Doctor or Patient
{//true
    YouAreADoctor = YesOrNO;
}

function ConnectionProblem() //For Knowing when it's have a problem of connexion
{
    var username = getCookie(CookieName[0]);
    var password = getCookie(CookieName[1]);
    var result = true
    if(username ==undefined || username=="" || password ==undefined || password=="" || doctor ==undefined )
    {
        result = false;
    }
    var urlFull = location.href.split('/')
    var url = urlFull[urlFull.length-1];
    if(url == "tasks.html" && doctor==true)
    {
        result = false;
    }
    if(url == "dashboard.html" && doctor==false)
    {
        result = false;
    }
    return result;
}

function CheckConnected() //Verify if you are connected
{ 
    var username = getCookie(CookieName[0])
     //Let you know on the console that you are connected
    if(!ConnectionProblem()) {
        location.href = "login.html"; //Return to the login html if your aren't connected
    }
    else
    {
        var name = document.getElementById("username");
        name.innerHTML = username;
    }
    console.log("connected = " + ConnectionProblem());
}