var CookieName = ["username","password","usertype"]; //The value to make on the cookie (to add on the code)

function ConnectionProblem() //For Knowing when it's have a problem of connexion
{
    var username = getCookie(CookieName[0]);
    var password = getCookie(CookieName[1]);
    var result = true;
    if(username ==undefined || username=="" || password ==undefined || password=="" || doctor ==undefined )
    {
        result = false;
    }
    var urlFull = location.href.split('/');
    var url = urlFull[urlFull.length-1];
    if(url == "tasks" && doctor==0)
    {
        result = false;
    }
    if(url == "dashboard" && doctor==1)
    {
        result = false;
    }
    return result;
}

window.onload = function CheckConnected() //Verify if you are connected
{
    var username = getCookie(CookieName[0]);
    //Let you know on the console that you are connected
    if(!ConnectionProblem()) {
        location.href = "login"; //Return to the login html if your aren't connected
    }
    else
    {
        var name = document.getElementById("username");
        name.innerHTML = username;
    }
    console.log("connected = " + ConnectionProblem());
};