const storage = window.sessionStorage;
var catalog;

window.onload = async function(){
    checkIfAnnonymous();
    if (storage.catalog !== undefined) {
        catalog = JSON.parse(storage.catalog);
        updatePage(catalog);
        updateItems();
        console.log(catalog);
    }
}

function remove() {
    alert("Coming soon!");
}

function updateItems() {
    category = document.getElementById("selectCategory").value;
    selectItem = document.getElementById("selectItem");
    removeOptions(selectItem);
    switch(category) {
        case 'classification':
            catalog.clList.forEach(element => {
                var option = document.createElement('option');
                option.value = element.classificationID;
                option.innerHTML = element.name;
                selectItem.appendChild(option);
            });
            break;
        case 'algorithm':
            catalog.clList.forEach(element => {
                element.algorithms.forEach(algorithm => {
                    var option = document.createElement('option');
                    option.value = algorithm.algorithmID;
                    option.innerHTML = algorithm.name;
                    selectItem.appendChild(option);
                })
            });
            break;
        case 'implementation':
            catalog.clList.forEach(element => {
                element.algorithms.forEach(algorithm => {
                    algorithm.implementations.forEach(implementation => {
                        var option = document.createElement('option');
                        option.value = implementation.implementationID;
                        option.innerHTML = implementation.filename;
                        selectItem.appendChild(option);
                    })
                })
            });
            break;
        case 'problemInstance':
            break;
        case 'benchmark':
            break;
    }
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

function checkIfAnnonymous(){
    
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden"
    }
}