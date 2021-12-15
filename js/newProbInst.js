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

var toSend = [];

function submitNewProbInst(e) {
    e.preventDefault();
    console.log(document.getElementById("dataSet").files[0]);
    console.log(getByteArray());
    post();
}

async function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/probleminstance", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    await getByteArray()
    let uname = null
    if(storage.username !== "null"){
        uname = storage.username
    }
    xhr.send(JSON.stringify({
        name: document.getElementById("name").value,
        desc: document.getElementById("description").value,
        data: JSON.stringify(toSend),
        algoID: document.getElementById("algorithm").value,
        userID: uname
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            console.log("Valid Problem Instance")
            // location.href = "home.html";
        }
        else{
            alert("Invalid Problem Instance")
        }
    }
    }

async function getByteArray() {
    let myFile = document.getElementById('dataSet').files[0];
    let byteArray = await fileToByteArray(myFile);
    console.log(byteArray);
    toSend = byteArray
}

function fileToByteArray(file) {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState == FileReader.DONE) {
                    let arrayBuffer = evt.target.result,
                        array = new Uint8Array(arrayBuffer);
                    for (byte of array) {
                        fileByteArray.push(byte);
                    }
                }
                resolve(fileByteArray);
            }
        }
        catch (e) {
            reject(e);
        } 
    })
}

function checkIfAnnonymous(){
    if(storage.username !== "null"){
        document.getElementById("login").style.visibility="hidden"
        document.getElementById("newProbInst").hidden = false;
        document.getElementById("nullUser").hidden = true;
    } else {
        document.getElementById("newProbInst").hidden = true;
        document.getElementById("nullUser").hidden = false;
        document.getElementById("manage").style.visibility="hidden";
    }
}