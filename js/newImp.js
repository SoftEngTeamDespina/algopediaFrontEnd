
var fileByteArray = [];
    
document.getElementById("newImp").onclick = async function () {
    console.log(document.getElementById("impFile").files[0])
    console.log(document.getElementById("impFile").value)
    console.log(document.getElementById("impFile"))
    await post()
}
function post(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://rhoplou1ei.execute-api.us-east-2.amazonaws.com/iteration1/implementation", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        language: document.getElementById("lang").value,
        code: document.getElementById("impFile").files[0],
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

    async function uploadFile(){
        var files = document.getElementById("impFile").files[0];
        var reader = new FileReader();
        reader.onload = processFile(files);
        reader.readAsText(files);
      }

      function processFile(theFile){
        return function(e) { 
          var theBytes = e.target.result; //.split('base64,')[1]; // use with uploadFile2
          fileByteArray.push(theBytes);
          var texts = ""
          for (var i=0; i<fileByteArray.length; i++) {
              texts += fileByteArray[i];
          }
          console.log(texts)
        }
    }