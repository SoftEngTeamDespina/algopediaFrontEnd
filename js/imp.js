document.getElementById("home").onclick =function () {
    location.href = "home.html";
}
document.getElementById("addInst").onclick =function () {
    alert("Feature coming soon!")
}
document.getElementById("down").onclick =function () {
    alert("Feature coming soon!")
}
document.getElementById("del").onclick =function () {
    alert("Feature coming soon!")
}
document.getElementById("impSearch").onclick =function () {
    // data = get()
    // updatePage(data)
    alert("Feature Coming Soon!")
}
function get(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/iteration1/implementation", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id: document.getElementById("impID").value
    }));
    return xhr.responseText;
    }

function updatePage(data){
    realData = JSON.parse(data);
    document.getElementById("lang").innerHTML = realData.language;
    document.getElementById("down").innerHTML = realData.code;
}

function checkIfAnnonymous(){
    
    if(storage.username !== undefined){
        document.getElementById("login").style.visibility="hidden"
    }
}