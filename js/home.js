const storage = window.sessionStorage;

window.onload = async function(){
    data = await fetchAll();
    console.log(data);
    updatePage(data);
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
    // location.href = "class.html";
    alert("Feature Coming Soon!")
}

document.getElementById("algoSearch").onclick =function () {
    // location.href = "algo.html";
    alert("Feature Coming Soon!")
}

document.getElementById("impSearch").onclick =function () {
    // location.href = "imp.html";
    alert("Feature Coming Soon!")
}

// document.getElementById("newInst").onclick =function () {
//     alert("Feature Coming Soon!")
// }

async function fetchAll() {
    const response = await fetch('https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/allClassifications');
    const data = await response.json()
    return data
  }

function comingSoon(){
    alert("Feature Coming Soon!")
}

function updatePage(data){
    div = document.getElementById("data")
    for(let i = 0; i < data.clList.length; i++){
        var node = document.createElement('ol');
        node.innerHTML = data.clList[i].name
        div.appendChild(node)
        indented = node.appendChild(document.createElement("ul"))
        for(let j = 0; j < data.clList[i].algorithms.length; j++){
            var childNode = document.createElement('li')
            childNode.innerHTML = data.clList[i].algorithms[j].name
            indented.appendChild(childNode)
            
        }
    }
}
