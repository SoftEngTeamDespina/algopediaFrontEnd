const storage = window.sessionStorage;

async function registerUser(e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var username = document.getElementById("username").value;
    var password = stringToHash(document.getElementById("password").value).toString();
    var temp;
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/user", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response);
        if(temp.httpStatusCode == 200) {
            storage.username = username;
            location.href = "home.html";
        }
        else {
            alert(temp.logMsg);
        }
    }
}

function login(e) {
    e.preventDefault();
    alert("Feature coming soon");
}

function continueAsGuest(e) {
    e.preventDefault();
    storage.username = undefined;
    location.href = "home.html";
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

