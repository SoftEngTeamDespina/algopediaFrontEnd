const storage = window.sessionStorage;
let algorithm;

window.onload = function() {
    catalog = JSON.parse(storage.catalog);
    checkIfAnnonymous()
    algorithm = JSON.parse(storage.selectedAlgorithm);
    document.getElementById('algoname').innerHTML = algorithm.name;
    loadBenchmarks()
    if (catalog !== undefined) {
        updatePage(catalog);
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

function loadBenchmarks(){
    var tbl = document.getElementById("benchmarks");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/benchmark/get", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        algorithm: algorithm.name
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            let i = 1
            for(const elmnt of temp.benchmarks){
                var row = tbl.insertRow(i);
                row.insertCell(0).innerHTML = elmnt.name
                row.insertCell(1).innerHTML = elmnt.implementation.language
                row.insertCell(2).innerHTML = elmnt.configuration.cores
                row.insertCell(3).innerHTML = elmnt.configuration.cpu
                row.insertCell(4).innerHTML = elmnt.configuration.threads
                row.insertCell(5).innerHTML = elmnt.configuration.l1
                row.insertCell(6).innerHTML = elmnt.configuration.l2
                row.insertCell(7).innerHTML = elmnt.configuration.l3
                row.insertCell(8).innerHTML = elmnt.date
                row.insertCell(9).innerHTML = elmnt.runtime
                row.insertCell(10).innerHTML = elmnt.instance.name
                // var btn = document.createElement('button')
                // btn.innerHTML = 'x'
                // btn.onclick = function() {
                //     deleteBenchmark(elmnt.benchmarkID);
                // }
                // row.insertCell(10).appendChild(btn)
                i++;
            }
        }
        else{
            alert("Invalid Algorithm Name")
        }
    }
}


function deleteBenchmark(benchmarkID){
    var tbl = document.getElementById("benchmarks");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/benchmark/delete", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({    
        id: benchmarkID,
        user: storage.username
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            location.href = "benchmark.html";
        }
        else{
            alert("Could not delete")
        }
    }

}

    function checkIfAnnonymous(){
    
        if(storage.username !== "null"){
            document.getElementById("login").style.visibility="hidden"
        }
    }