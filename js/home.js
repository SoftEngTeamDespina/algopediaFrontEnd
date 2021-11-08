window.onload() = function(){
    data = get()
    updatePage(data)
}
document.getElementById("newClass").onclick =function () {
    location.href = "newClass.html";
}

document.getElementById("newAlgo").onclick =function () {
    location.href = "newAlgo.html";
}

document.getElementById("newImp").onclick =function () {
    location.href = "newImp.html";
}

document.getElementById("classSearch").onclick =function () {
    location.href = "class.html";
}

document.getElementById("algoSearch").onclick =function () {
    location.href = "algo.html";
}

document.getElementById("impSearch").onclick =function () {
    location.href = "imp.html";
}
function get(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/alphaUser/classification/all", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    return xhr.responseText;
    }

function updatePage(data){
    realData = JSON.parse(data);
    div = document.getElementById("data")
    var node = document.createElement('li');
    div.appendChild(node)
    node.appendChild(document.createTextNode('Scooter'))
}