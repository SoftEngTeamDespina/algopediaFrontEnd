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
    getProbInstances();
}

function changeProblemInstance() {
    var select = document.getElementById("problemInstance");
    var algorithm = document.getElementById("algorithm");
    removeOptions(select);
}

function getProbInstances(){
    var select = document.getElementById("problemInstance");
    removeOptions(select);
    var algorithm = document.getElementById("algorithm");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/probleminstance/all", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        algorithm: algorithm.options[algorithm.selectedIndex].text
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            for(const elmnt of temp.instances){
                var opt = document.createElement('option');
                opt.value = elmnt.problemInstanceID;
                opt.innerHTML = elmnt.name;
                select.appendChild(opt);
            }
        }
        else{
            alert("Invalid Algorithm Name")
        }
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

function createNewBenchmark(e){
    e.preventDefault();
    post();
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
        observations: document.getElementById("observation").value,
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            console.log("Valid Benchmark")
            //location.href = "home.html";
        }
        else{
            alert("Invalid Benchmark")
        }
    }
    }


function checkIfAnnonymous(){
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden"
    }
}
