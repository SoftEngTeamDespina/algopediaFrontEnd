document.getElementById("newClass").onclick =function () {
    post();
    location.href = "class.html";
}
function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/iteration1/classification", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        superClassification: document.getElementById("parent").value
    }));
    }