const storage = window.sessionStorage;
var catalog;

window.onload = async function(){
    checkIfAnnonymous();
    if (storage.catalog !== undefined) {
        catalog = JSON.parse(storage.catalog);
        updatePage(catalog);
        updateItems();
        updateUsers();
        addAlgorithms();
        console.log(catalog);
    }
}

function loadBenchmarks(algorithm) {
    selectItem = document.getElementById("selectItem");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/benchmark/get", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        algorithm: algorithm
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response);
        if(temp.statusCode == 200) {
            if (temp.benchmarks !== undefined) {
                temp.benchmarks.forEach(element => {
                var option = document.createElement('option');
                option.value = element.benchmarkID;
                option.innerHTML = element.name;
                selectItem.appendChild(option);
                })
            }
        }
    }
}

function getProbInstances(algorithm){
    var select = document.getElementById("problemInstance");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/probleminstance/all", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        algorithm: algorithm
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response);
        if(temp.statusCode == 200) {
            if (temp.instances !== undefined) {
                temp.instances.forEach(element => {
                var option = document.createElement('option');
                option.value = element.problemInstanceID;
                option.innerHTML = element.name;
                selectItem.appendChild(option);
                })
            }
        }
    }
}

function addAlgorithms() {
    let algorithmSelect = document.getElementById("algorithm");
    catalog.clList.forEach(element => {
        element.algorithms.forEach(algorithm => {
            var option = document.createElement('option');
            option.value = algorithm.name;
            option.innerHTML = algorithm.name;
            algorithmSelect.appendChild(option);
        })
    });
}

function remove() {
    alert("Coming soon!");
}

function updateItems() {
    category = document.getElementById("selectCategory").value;
    selectItem = document.getElementById("selectItem");
    let algorithmDiv = document.getElementById("algorithmDiv");
    let algorithmSelect = document.getElementById("algorithm");
    removeOptions(selectItem);
    switch(category) {
        case 'classification':
            algorithmDiv.hidden = true;
            catalog.clList.forEach(element => {
                var option = document.createElement('option');
                option.value = element.classificationID;
                option.innerHTML = element.name;
                selectItem.appendChild(option);
            });
            break;
        case 'algorithm':
            algorithmDiv.hidden = true;
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
            algorithmDiv.hidden = false;
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
            algorithmDiv.hidden = false;
            getProbInstances(algorithmSelect.value);
            break;
        case 'benchmark':
            algorithmDiv.hidden = false;
            loadBenchmarks(algorithmSelect.value);
            break;
    }
}

function updateUsers(){
    var select = document.getElementById("selectUserItem");
    removeOptions(select);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/user", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null)
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.httpStatusCode == 200){
            for(const elmnt of temp.username){
                var opt = document.createElement('option');
                opt.value = elmnt;
                opt.innerHTML = elmnt;
                select.appendChild(opt);
            }
        }
        else{
            alert("Error Fetching Users")
        }
    }
}

function downloadActivity(e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/user/activity", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: document.getElementById("selectUserItem").value,
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        console.log(temp)
        if(temp.httpStatusCode == 200){
            console.log("Valid user")
            //location.href = "home.html";
        }
        else{
            alert("Invalid user")
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

function checkIfAnnonymous(){
    
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden"
    }
}