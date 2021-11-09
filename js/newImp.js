
var toSend = [];
    
document.getElementById("newImp").onclick = async function () {
    console.log(document.getElementById("impFile").files[0])
    console.log(getByteArray(document.getElementById("impFile").files[0]));
    await post()
}
async function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/implementation", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    await getByteArray(document.getElementById("impFile").files[0])
    xhr.send(JSON.stringify({
        language: document.getElementById("lang").value,
        code: toSend,
        id: document.getElementById("id").value,
    }));
    xhr.onload = function(){
        temp = JSON.parse(xhr.response)
        if(temp.statusCode == 200){
            console.log("Valid Implementation")
            location.href = "home.html";
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