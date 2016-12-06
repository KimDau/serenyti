var CookieName = ["username","password"]; //The value to make on the cookie (to add on the code)
var ExpirationTime = 1; //1 day

function setCookie(username, password) { //Create cookie
    var d = new Date();
    d.setTime(d.getTime() + (ExpirationTime*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = CookieName[0] + "=" + password +";" + CookieName[1] + "=" + username + ";"  + expires + ";path=/"; //Initialiaze cookie value
    //Lots of problem with the order be careful !!!
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

function checkPassword(username,password) { //Check the password, into the cookie (TO MODIFY)
    var userpassword = getCookie(CookieName[1]);
    var usernameC = getCookie(CookieName[0]);
    var result = true;
    console.log("username : " + usernameC + " vs " + username + " & userpassword : " + userpassword + " vs " + password);
    if (usernameC =="" && password != "" && username != "") 
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
        console.log(checkPassword(User[0].value,User[1].value));
        /*if(checkPassword(User[0].value,User[1].value)) {return true;}
        else {return false;}*/
        return checkPassword(User[0].value,User[1].value); //Return to the index page if you have the right name
    });
});
