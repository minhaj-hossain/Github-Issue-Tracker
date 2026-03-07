// get the input field value from the login page
const userName = document.getElementById("user-name");
const password = document.getElementById("password");

// login function
function loadPage() {
    
    if(userName.value === "admin" && password.value === "admin123") {
        window.location.href = "main.html";
    }else {
        return;
    }

}







