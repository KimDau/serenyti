var CookieName = ["username","autrenom"]; //The value to make on the cookie (to add on the code)
var ExpirationTime = 1; //1 day

function setCookie(username, password) { //Create cookie
    var d = new Date();
    d.setTime(d.getTime() + (ExpirationTime*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    console.log("test = "+username + " ? " + password);
    document.cookie = CookieName[0] + "=" + username + "-" + CookieName[1] + "=" + password +";"+ expires + ";path=/"; //Initialiaze cookie value
    console.log(document.cookie);
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

function checkPassword(username,password) { //Check the password, into the cookie (TO MODIFY)
    var userpassword = getCookie(CookieName[1]);
    var result = true;
    //console.log("userpassword : " + userpassword + " vs " + password);
    if (userpassword == "") 
       {
        setCookie(username,password);
       }
    else
       {
            if(userpassword != password)
            {
                result = false;
            }
       }
    return result;
}

$(document).ready(function(){ //check the document changes
    $("form").on("submit", function(event){ //On the form submit
        event.preventDefault();
        //alert("You have tried to connect");
        console.log("You have tried to connect");
        var User = $( this ).serializeArray();
        checkPassword(User[0].value,User[1].value);
        console.log("user : " + getCookie(CookieName[0]) +" mot de passe : " + getCookie(CookieName[1]));
        return false;
        //return checkPassword(); //Return to the index page if you have the right name
    });
});
