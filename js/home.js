const storage = window.sessionStorage;

window.onload = async function(){
    data = await fetchAll();
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
        createCatalog(div, element);
    });
}

function createCatalog(div, element) {
    var node = document.createElement('ol');
    node.innerHTML = element.name;
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
        storage.selectedAlgorithm = algorithm.algorithmID;
        location.href = "algorithm.html";
    }
    indented.appendChild(childNode);
}
