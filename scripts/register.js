document.addEventListener("DOMContentLoaded", () => {
	// example in the video does not work
	
	// add song button click
	// document.querySelector("#addBtn").addEventListener("click", addSong);

	// this is an updated example using a google search results guide

	// get the form 
	const form = document.getElementById('registerForm');

	// form was submitted
	form.addEventListener('submit', async (e) => {

		// prevent form from submitting 
		e.preventDefault();

		//alert('clicked...');
		document.getElementById('error').style.display='none';
		document.getElementById('success').style.display='none';

		// from google: get form fields by their "name" attributes
		const formData = new FormData(form);

		// from google: Convert FormData to a regular JSON object
		const data = Object.fromEntries(formData.entries());

		// attempt to post form to api end point (google example is very similar to video example)
		try {

			// dev
			// let url = "http://localhost:3000/api/newUser";
			
			// live
			let url = "https://sdev-module5-tutorial.onrender.com/api/newUser";

			const response = await fetch(url, {
			method: 'POST',
				headers: {
					'Content-Type': 'application/json' 
				},
				body: JSON.stringify(data)
			});

			// await api response
			const result = await response.json();

			// response is ok
			if (response.ok) {	

				// add success message
				const successDiv = document.getElementById("success");
				
				// does not work
				// change success div class
				// successDiv.classList.add("alert alert-success");

				// Replace its contents with text
				successDiv.textContent = "Account Created! ID: " + result._id + ' ';

				const element = document.getElementById("my-element");

				// 1. Create the anchor element
				const link = document.createElement("a");

				// 2. Set its text content and destination URL
				link.textContent = "Click here to login"; 
				link.href = "login.html";

				// add link
				successDiv.appendChild(link);     

				// show div
				successDiv.style.display = "block";

				// responseMessage.textContent = `Success: ${result.message}`;

				// reset the form
				form.reset(); 

			} else {
			
				// error
				// responseMessage.textContent = `Error: ${result.error}`;

				const errorDiv = document.getElementById("error");

				// does not work
				// change error div class
				// errorDiv.classList.add("alert alert-danger");

				// update error div text
				errorDiv.textContent = `Error: ${result.error}`;
			
				// show div
				errorDiv.style.display = "block";

			}

		} catch (error) {
			// try block failed...
			// console.error('Fetch error:', error);

			const errorDiv = document.getElementById("error");

			// change error div class
			// errorDiv.classList.add("alert alert-danger");

			// update error div text
			errorDiv.textContent = `Error: ${error}`;

			// show div
			errorDiv.style.display = "block";

		}
	});
});