function submit(e) {
    e.preventDefault();
    
}


async function registerUser() {
    alert("test");
    // var xhr = new XMLHttpRequest();
    // var temp
    // xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/user", true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({
    //     username: document.getElementById("username").value,
    //     password: stringToHash(document.getElementById("password").value).toString()
    // }));
    // xhr.onload = function(){
    //     temp = JSON.parse(xhr.response)
    //     console.log(temp);
    //     // if(temp.httpStatusCode == 200){
    //     //     console.log("Valid User")
    //     //     // location.href = "home.html";
    //     // }
    //     // else{
    //     //     alert("Invalid User")
    //     // }
    // }
}

function login() {
    alert("Feature coming soon");
}

function continueAsUser() {
    alert("feature coming soon");
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

