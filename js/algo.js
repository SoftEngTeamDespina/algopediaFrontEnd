document.getElementById("home").onclick =function () {
    location.href = "home.html";
}
document.getElementById("del").onclick =function () {
    alert("Feature coming soon!")
}
document.getElementById("algoSearch").onclick =function () {
    // data = get()
    // updatePage(data)
    alert("Feature Coming Soon!")
}
function get(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/iteration1/algorithm", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id: document.getElementById("algoID").value
    }));
    return xhr.responseText;
    }

function updatePage(data){
    realData = JSON.parse(data);
    document.getElementById("name").innerHTML = realData.name;
    document.getElementById("desc").innerHTML = realData.description;
    document.getElementById("class").innerHTML = realData.classification;
}