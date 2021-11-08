document.getElementById("home").onclick =function () {
    location.href = "home.html";
}
document.getElementById("del").onclick =function () {
    alert("Feature coming soon!")
}
document.getElementById("classSearch").onclick =function () {
    // data = get()
    // updatePage(data)
    alert("Feature Coming Soon!")
}
function get(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/iteration1/classification", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id: document.getElementById("classID").value
    }));
    return xhr.responseText;
    }

function updatePage(data){
    realData = JSON.parse(data);
    document.getElementById("name").innerHTML = realData.name;
    document.getElementById("desc").innerHTML = realData.description;
}