document.getElementById("newImp").onclick =function () {
    post()
    location.href = "imp.html";
}
function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/iteration1/implementation", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        language: document.getElementById("lang").value,
        code: document.getElementById("id").value,
        id: document.getElementById("impFile").value,
    }));
    }