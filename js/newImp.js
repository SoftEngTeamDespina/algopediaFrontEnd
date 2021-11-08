
var fileByteArray = [];
    
document.getElementById("newImp").onclick = async function () {
    console.log(document.getElementById("impFile").files[0])
    console.log(getAsByteArray(document.getElementById("impFile").files[0]));
    await post()
}
async function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/implementation", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    await getAsByteArray(document.getElementById("impFile").files[0])
    xhr.send(JSON.stringify({
        language: document.getElementById("lang").value,
        code: fileByteArray,
        id: document.getElementById("id").value,
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.httpStatusCode == 200){
            console.log("Valid Implementation")
            // location.href = "home.html";
        }
        else{
            alert("Invalid Implementation")
        }
    }
    }

async function getAsByteArray(file) {
    fileByteArray =  Uint8Array(await readFile(file))
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        // Create file reader
        let reader = new FileReader()

        // Register event listeners
        reader.addEventListener("loadend", e => resolve(e.target.result))
        reader.addEventListener("error", reject)

        // Read file
        reader.readAsArrayBuffer(file)
    })
}