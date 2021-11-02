document.getElementById("newUser").onclick = function () {
    if (document.getElementById("user").value != "" && document.getElementById("pass").value != "") {
        if (document.getElementById("pass").value == document.getElementById("confirm").value) {
            alert("Account Created");
            location.href = "home.html";
        }
        else {
            alert("passwords dont match");
        }
    }
    else{
        alert("Input a username and password")
    }

}