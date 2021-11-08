document.getElementById("newUser").onclick = function () {
    if (document.getElementById("user").value != "" && document.getElementById("pass").value != "") {
        if (document.getElementById("pass").value == document.getElementById("confirm").value) {
            post()
            alert("logged in");
            location.href = "home.html";
        }
        else {
            alert("passwords dont match");
        }
    }
    else{
        alert("Input a username and password")
    }
}

function stringToHash(string) {
                  
    var hash = 0;
      
    if (string.length == 0) return hash;
      
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
      
    return hash;
}

function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/alphaUser/user", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: document.getElementById("user").value,
        password: stringToHash(document.getElementById("pass").value).toString()
    }));
    }