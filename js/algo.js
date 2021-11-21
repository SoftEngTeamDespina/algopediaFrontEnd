const storage = window.sessionStorage;

window.onload = function() {
    catalog = JSON.parse(storage.catalog);
    algorithm = JSON.parse(storage.selectedAlgorithm);
    if (catalog !== undefined) {
        updatePage(catalog);
    }

    if (algorithm !== undefined) {
        displayAlgorithm(algorithm);
    }
}

function displayAlgorithm(algorithm) {
    var title = document.getElementById("algorithmName");
    title.innerHTML = algorithm.name;
    createImplementations(algorithm);
}

function createImplementations(algorithm) {
    div = document.getElementById("implementations")
    algorithm.implementations.forEach(element => {
        var node = document.createElement('ul');
        node.innerHTML = element.filename;
        node.style.cursor = "pointer";
        node.onclick = function() {
            alert("Get file");
        }
        div.appendChild(node);
    });
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
        storage.selectedAlgorithm = JSON.stringify(algorithm);
        location.href = "algorithm.html";
    }
    indented.appendChild(childNode);
}

// function get(){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://uvioipofh3.execute-api.us-east-2.amazonaws.com/iteration1/algorithm", true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({
//         id: document.getElementById("algoID").value
//     }));
//     return xhr.responseText;
//     }

// function updatePage(data){
//     realData = JSON.parse(data);
//     document.getElementById("name").innerHTML = realData.name;
//     document.getElementById("desc").innerHTML = realData.description;
//     document.getElementById("class").innerHTML = realData.classification;
// }