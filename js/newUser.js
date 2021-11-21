document.getElementById("newUser").onclick = async function () {
    if (document.getElementById("user").value != "" && document.getElementById("pass").value != "") {
        if (document.getElementById("pass").value == document.getElementById("confirm").value) {
            await post()
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

async function post(){
    var xhr = new XMLHttpRequest();
    var temp
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/user", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: document.getElementById("user").value,
        password: stringToHash(document.getElementById("pass").value).toString()
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.httpStatusCode == 200){
            console.log("Valid User")
            location.href = "home.html";
        }
        else{
            alert("Invalid User")
        }
    }
}