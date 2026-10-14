document.addEventListener("DOMContentLoaded", () => {
	// get user type from local storage
	document.getElementById("userIdDebug").innerHTML = localStorage.getItem('userId');
	document.getElementById("userNameDebug").innerHTML = localStorage.getItem('username');
	document.getElementById("userTypeDebug").innerHTML = localStorage.getItem('userType');
});