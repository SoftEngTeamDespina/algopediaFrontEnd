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

var toSend = [];

function submitNewImp(e) {
    e.preventDefault();
    console.log(document.getElementById("impFile").files[0]);
    console.log(getByteArray());
    post();
}

async function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/implementation", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    await getByteArray()
    xhr.send(JSON.stringify({
        language: document.getElementById("lang").value,
        code: JSON.stringify(toSend),
        algorithm: document.getElementById("algorithm").value,
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            console.log("Valid Implementation")
            // location.href = "home.html";
        }
        else{
            alert("Invalid Implementation")
        }
    }
    }

async function getByteArray() {
    let myFile = document.getElementById('impFile').files[0];
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
    }
}