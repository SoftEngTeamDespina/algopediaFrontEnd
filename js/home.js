const storage = window.sessionStorage;

window.onload = async function(){
    data = await fetchAll();
    checkIfAnnonymous();
    updatePage(data);
    addToLocalStorage(data);
}

async function fetchAll() {
    const response = await fetch('https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/allClassifications');
    const data = await response.json();
    return data;
}

function addToLocalStorage(data) {
    storage.catalog = JSON.stringify(data);
}

function updatePage(data) {
    div = document.getElementById("data")
    data.clList.forEach(element => {
        if (element.superClassification) {
            createIndentCatalog(element);
        } else {
            createCatalog(div, element);
        }
    });
}

function createIndentCatalog(element) {
    let parentNode = document.getElementById(element.superClassification);
    createCatalog(parentNode, element);
}

function createCatalog(div, element) {
    var node = document.createElement('ol');
    node.innerHTML = element.name.bold();
    node.setAttribute('id', element.classificationID);
    div.appendChild(node);
    indented = node.appendChild(document.createElement("ul"));
    element.algorithms.forEach(algorithm => {
        createAlgorithmInCatalog(algorithm, indented);
    })
}

function createAlgorithmInCatalog(algorithm, indented) {
    var childNode = document.createElement('li');
    childNode.innerHTML = algorithm.name;
    childNode.style.cursor = "pointer";
    childNode.onclick = function() {
        storage.selectedAlgorithm = JSON.stringify(algorithm);
        location.href = "algorithm.html";
    }
    indented.appendChild(childNode);
}

function checkIfAnnonymous(){
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden";
    } else {
        document.getElementById("manage").style.visibility="hidden";
    }
}