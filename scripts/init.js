const auth = new Auth();

// logout button clicked
document.querySelector("#logout").addEventListener("click", (e) => {
	e.preventDefault();
	auth.logOut();
});

// show welcome username in upper right
document.getElementById("usernameText").innerHTML = "Welcome, " + localStorage.getItem('username');