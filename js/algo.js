const storage = window.sessionStorage;

window.onload = function() {
    catalog = JSON.parse(storage.catalog);
    checkIfAnnonymous()
    algorithm = JSON.parse(storage.selectedAlgorithm);
    if (catalog !== undefined) {
        updatePage(catalog);
    }

    if (algorithm !== undefined) {
        displayAlgorithm(algorithm);
        getProblemInstance(algorithm);
    }
}

function displayAlgorithm(algorithm) {
    var title = document.getElementById("algorithmName");
    title.innerHTML = algorithm.name;
    var title = document.getElementById("description");
    title.innerHTML = algorithm.description;
    createImplementations(algorithm);
}


function createImplementations(algorithm) {
    div = document.getElementById("implementations")
    algorithm.implementations.forEach(element => {
        var node = document.createElement('ul');
        node.innerHTML = element.filename;
        node.style.cursor = "pointer";
        node.onclick = function() {
            getFile(element.implementationID, "implementations");
        }
        div.appendChild(node);
    });
}

function getProblemInstance(algorithm) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/probleminstance/all", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        algorithm: algorithm.name
    }));
    xhr.onload = function() {
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
                div = document.getElementById("probInst")
                temp.instances.forEach(element => {
                    console.log(element)
                    var node = document.createElement('ul');
                    node.innerHTML = element.name;
                    node.style.cursor = "pointer";
                    node.onclick = function() {
                        getFile(element.name+element.algoID, "ProblemInstances");
                    }
                    div.appendChild(node);
                });
        }
        else{
            alert("Invalid Algorithm Name")
        }
    }
}

function getFile(fileName, folder) {
    var xhr = new XMLHttpRequest();
    let url = "https://cs509teamdespina.s3.us-east-2.amazonaws.com/"+folder+"/" + fileName + ".txt"
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onload = function(e) {
        if (this.status == 200) {
            $('<iframe>', { id:'idown', src:url }).hide().appendTo('body').click();
        } else {
            alert("unable to get file")
        }
    }
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
        document.getElementById("login").style.visibility="hidden"
    } else {
        document.getElementById("manage").style.visibility="hidden";
    }
}

function loadBenchmarks(e){
    e.preventDefault()
    location.href = "benchmark.html"
}