document.getElementById("newAlgo").onclick =async function () {
    await post()
}
function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/algorithm", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        id: document.getElementById("class").value
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            console.log("Valid Algorithm")
            location.href = "home.html";
        }
        else{
            alert("Invalid Algorithm")
        }
    }
    }