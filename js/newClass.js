const storage = window.sessionStorage;

window.onload = function() {

    catalog = JSON.parse(storage.catalog);
    checkIfAnnonymous()
    if (catalog !== undefined) {
        updatePage(catalog);
        updateClassification(catalog);
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

function updateClassification(catalog) {
    select = document.getElementById("superClass");
    var nullopt = document.createElement('option');
    nullopt.value = null;
    nullopt.innerHTML = '--';
    select.appendChild(nullopt);
    catalog.clList.forEach(element => {
        var opt = document.createElement('option');
        opt.value = element.classificationID;
        opt.innerHTML = element.name;
        select.appendChild(opt);
    });
}


function newClass(e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/classification", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        superClassification: document.getElementById("superClass").value,
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            console.log("Valid Classification")
            //location.href = "newClass.html";
        }
        else{
            alert("Invalid Classificiation")
        }
    }
    }

    function checkIfAnnonymous(){
        if(storage.username !== "null"){
            document.getElementById("login").style.visibility="hidden"
            document.getElementById("newClass").hidden = false;
            document.getElementById("nullUser").hidden = true;
            document.getElementById("manage").hidden = false;
        } else {
            document.getElementById("newClass").hidden = true;
            document.getElementById("nullUser").hidden = false;
            document.getElementById("manage").hidden = true;
            document.getElementById("manage").style.visibility="hidden";
        }
    }