document.getElementById("newUser").onclick =function () {
        location.href = "newUser.html";
}

document.getElementById("login").onclick =async function () {
    data = await post()
    console.log(data)
    if(data == 200){
        console.log("Valid User")
        // location.href = "home.html";
    }
    else{
        alert("Invalid User")
    }
}
function post(){
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/user", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    username: document.getElementById("user").value,
    password: stringToHash(document.getElementById("pass").value).toString()
}));
return xhr.status
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