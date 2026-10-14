const auth = new Auth();

// logout button clicked
document.querySelector("#logout").addEventListener("click", (e) => {
	e.preventDefault();
	auth.logOut();
});

// show welcome username in upper right
document.getElementById("usernameText").innerHTML = "Welcome, " + localStorage.getItem('username');

// user type
const userType = localStorage.getItem('userType');

// show links based on userType
if(userType == '1'){
	// student

	// change the text in the logo link at the top left
	document.getElementById('logoLink').innerHTML = "SDEV 255 Final - Student Area";
	document.getElementById('studentLinks').style.display = 'block'; 
	document.getElementById('instructorLinks').style.display = 'none'; 
}
if(userType == '2'){
	document.getElementById('logoLink').innerHTML = "SDEV 255 Final - Instructor Area";
	document.getElementById('studentLinks').style.display = 'none'; 
	document.getElementById('instructorLinks').style.display = 'block'; 
}
