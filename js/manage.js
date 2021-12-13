const storage = window.sessionStorage;
let algorithms = [];

window.onload = function() {
    catalog = JSON.parse(storage.catalog);
    checkIfAnnonymous();
    if (catalog !== undefined) {
        updatePage(catalog);
    }

    populateClassificationsToKeep();
    populateAlgorithms();
    populateClassificationToMerge();
    populateNewClassification();
}

function mergeClass(e) {  
    e.preventDefault();
    var classToKeep = document.getElementById("classToKeep").value;
    var classToMerge = document.getElementById("classToMerge").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/classification/merge", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        user: storage.username,
        mergeID: classToMerge,
        keepID: classToKeep
    }));
    xhr.onload = function(){
        location.assign("home.html");
    }
}

function changeClass(e) {  
    e.preventDefault();
    var algorithm = document.getElementById("algorithm").value;
    var newClass = document.getElementById("newClass").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/algorithm/reclassify", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        user: storage.username,
        algoID: algorithm,
        classID: newClass
    }));
    xhr.onload = function(){
        location.assign("home.html");
    }
}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
}

function populateNewClassification() {
    let algorithmValue = document.getElementById("algorithm").value;
    let classID = algorithms.find(element => {
        return element.algorithmID === algorithmValue;
    }).classificationID;
    let newClass = document.getElementById("newClass");
    removeOptions(newClass);
    catalog.clList.forEach(element => {
        if (element.classificationID !== classID) {
            let option = document.createElement('option');
            option.value = element.classificationID;
            option.innerHTML = element.name;
            newClass.appendChild(option);
        }
    });
}

function populateClassificationToMerge() {
    let classToKeep = document.getElementById("classToKeep").value;
    let classToMerge = document.getElementById("classToMerge");
    removeOptions(classToMerge);
    catalog.clList.forEach(element => {
        if (element.classificationID !== classToKeep) {
            let option = document.createElement('option');
            option.value = element.classificationID;
            option.innerHTML = element.name;
            classToMerge.appendChild(option);
        }
    });
}

function populateClassificationsToKeep() {
    let classToKeep = document.getElementById("classToKeep");
    catalog.clList.forEach(element => {
        let option = document.createElement('option');
        option.value = element.classificationID;
        option.innerHTML = element.name;
        classToKeep.appendChild(option);
    });
}

function populateAlgorithms() {
    let algorithmSelect = document.getElementById("algorithm");
    catalog.clList.forEach(element => {
        element.algorithms.forEach(algorithm => {
            let option = document.createElement('option');
            option.value = algorithm.algorithmID;
            option.innerHTML = algorithm.name;
            algorithmSelect.appendChild(option);
            algorithms.push(algorithm);
        });
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

function checkIfAnnonymous(){
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden"
    }
}
