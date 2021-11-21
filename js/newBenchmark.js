const storage = window.sessionStorage;
var algorithms = []

window.onload = function() {
    catalog = JSON.parse(storage.catalog);
    checkIfAnnonymous()
    if (catalog !== undefined) {
        updatePage(catalog);
        addAlgorithms(catalog);
        changeImplementations();
    }
}

function addAlgorithms(catalog) {
    select = document.getElementById("algorithm");
    catalog.clList.forEach(element => {
        element.algorithms.forEach(algorithm => {
            algorithms.push(algorithm);
            var opt = document.createElement('option');
            opt.value = algorithm.algorithmID;
            opt.innerHTML = algorithm.name;
            select.appendChild(opt);
        })
    });
    console.log(algorithms);
}

function changeImplementations() {
    var select = document.getElementById("implementation");
    var algorithm = document.getElementById("algorithm");
    removeOptions(select);
    var newAlgorithm = algorithms.find(element => element.algorithmID === algorithm.value);
    newAlgorithm.implementations.forEach(implementation => {
        var opt = document.createElement('option');
        opt.value = implementation.implementationID;
        opt.innerHTML = implementation.filename;
        select.appendChild(opt);
    })
}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
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

function createNewBenchmark(e) {
    e.preventDefault();
}

function checkIfAnnonymous(){
    
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden"
    }
}
