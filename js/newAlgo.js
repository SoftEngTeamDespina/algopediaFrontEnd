const storage = window.sessionStorage;

window.onload = function() {
    catalog = JSON.parse(storage.catalog);
    checkIfAnnonymous()
    if (catalog !== undefined) {
        updatePage(catalog);
        console.log(catalog);
        updateClassification(catalog);
    }
}

function updateClassification(catalog) {
    select = document.getElementById("class");
    catalog.clList.forEach(element => {
        var opt = document.createElement('option');
        opt.value = element.classificationID;
        opt.innerHTML = element.name;
        select.appendChild(opt);
    });
}

function updatePage(data) {
    div = document.getElementById("data");
    children = []
    data.clList.forEach(element => {
        if (element.superClassification) {
            children.push(element);
        } else {
            createCatalog(div, element);
        }
    });
    while (children.length !== 0) {
        let child = children.shift();
        let parentNode = document.getElementById(child.superClassification);
        if (!!!parentNode) {
            children.push(child);
        } else {
            createIndentCatalog(child);
        }
    }
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


function newAlgo(e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/algorithm", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        user: storage.username,
        name: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        id: document.getElementById("class").value
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            location.assign('home.html');
        }
        else{
            alert("Invalid Algorithm")
        }
    }
    }

    function checkIfAnnonymous(){
        if(storage.username !== "null"){
            document.getElementById("login").style.visibility="hidden"
            document.getElementById("newAlgo").hidden = false;
            document.getElementById("nullUser").hidden = true;
        } else {
            document.getElementById("newAlgo").hidden = true;
            document.getElementById("nullUser").hidden = false;
            document.getElementById("manage").style.visibility="hidden";
        }
    }