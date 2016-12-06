var CookieName = ["username","test"];
var ExpirationTime = 1; //1 day

function setCookie(cname, cvalue, exdays) { //Create cookie
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; //Initialiaze cookie value
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

function checkCookie() { //Check cookie value
    var user = getCookie(CookieName[0]);
    if (user != "") {
        alert("Welcome again " + user); //A welcome alert pop if you are already register (to modify)
    } else {
        user = prompt("Please enter your name:", ""); //Or ask your name
        if (user != "" && user != null) {
            setCookie(CookieName[0], user, ExpirationTime);
        }
    }
}

$(document).ready(function(){
    $("form").on("submit", function(){
        alert("You have tried to connect");
        return false; //Do not return to the index page
        //return true; //That permit it
    });
});