document.getElementById("newAlgo").onclick =function () {
    location.href = "algo.html";
}
function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/alphaUser/algorithm", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        id: document.getElementById("class").value
    }));
    }