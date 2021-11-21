const storage = window.sessionStorage;

window.onload = function() {
    catalog = JSON.parse(storage.catalog);
    checkIfAnnonymous()
    if (catalog !== undefined) {
        updatePage(catalog);
        addAlgorithms(catalog);
    }
}

function addAlgorithms(catalog) {
    select = document.getElementById("algorithm");
    catalog.clList.forEach(element => {
        element.algorithms.forEach(algorithm => {
            var opt = document.createElement('option');
            opt.value = algorithm.algorithmID;
            opt.innerHTML = algorithm.name;
            select.appendChild(opt);
        })
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

function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/benchmark", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        user: storage.user,
        problem_instance: document.getElementById("problemInstance").value,
        implementation: document.getElementById("implementation").value,
        cpu: document.getElementById("cpu").value,
        cores: document.getElementById("cores").value,
        threads: document.getElementById("threads").value,
        l1: document.getElementById("l1").value,
        l2: document.getElementById("l2").value,
        l3: document.getElementById("l3").value,
        name: document.getElementById("name").value,
        runtime: document.getElementById("runtime").value,
        observations: document.getElementById("benchmark").value,
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


function checkIfAnnonymous(){
    
    if(storage.username !== null){
        document.getElementById("login").style.visibility="hidden"
    }
}