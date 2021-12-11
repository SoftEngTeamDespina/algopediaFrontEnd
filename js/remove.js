const storage = window.sessionStorage;
var catalog;
let algorithms = [];

async function fetchAll() {
    const response = await fetch('https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/allClassifications');
    const data = await response.json();
    return data;
}

function addToLocalStorage(data) {
    storage.catalog = JSON.stringify(data);
}

window.onload = async function(){
    data = await fetchAll();
    addToLocalStorage(data);
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

function changeImplementations(algorithm) {
    let selectItem = document.getElementById("selectItem");
    var newAlgorithm = algorithms.find(element => element.algorithmID === algorithm);
    newAlgorithm.implementations.forEach(implementation => {
        var opt = document.createElement('option');
        opt.value = implementation.implementationID;
        opt.innerHTML = implementation.filename;
        selectItem.appendChild(opt);
    });
}


function getProbInstances(algorithm){
    let selectItem = document.getElementById("selectItem");
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
            algorithms.push(algorithm);
            var option = document.createElement('option');
            option.value = algorithm.algorithmID;
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
            changeImplementations(algorithmSelect.value);
            break;
        case 'problemInstance':
            algorithmDiv.hidden = false;
            getProbInstances(algorithmSelect.options[algorithmSelect.selectedIndex].text);
            break;
        case 'benchmark':
            algorithmDiv.hidden = false;
            loadBenchmarks(algorithmSelect.options[algorithmSelect.selectedIndex].text);
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
    user = document.getElementById("selectUserItem").value;
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/user/activity", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: user,
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        console.log(temp)
        if(temp.httpStatusCode == 200) {
            let csvContent = "data:text/csv;charset=utf-8," 
            + 'user,action,timeStamp\n' + temp.actions.map(element => {
               return element.authorID + ',' + element.action + ',' + element.timeStamp
            }).join('\n');
            console.log(csvContent);
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", user+"_activity.csv");
            document.body.appendChild(link);

            link.click();
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

function checkIfAnnonymous() {
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden"
    }
}