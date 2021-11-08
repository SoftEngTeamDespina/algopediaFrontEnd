document.getElementById("newClass").onclick = async function () {
    await post();
}
async function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/classification", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        superClassification: null
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.httpStatusCode == 200){
            console.log("Valid Classification")
            // location.href = "home.html";
        }
        else{
            alert("Invalid Classificiation")
        }
    }
    }