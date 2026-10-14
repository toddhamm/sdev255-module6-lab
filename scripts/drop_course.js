addEventListener("DOMContentLoaded", async function() {
	// from google search

	// this is a workaround because event.preventDefault did not work in student_schedule.js 
	// see comment in student_schedule.js at end of file

	// 1. Get the query string from the current browser URL
	const queryString = window.location.search;

	// 2. Pass the string to URLSearchParams
	const urlParams = new URLSearchParams(queryString);

	// 3. Get specific values
	const id = urlParams.get('id'); 

	// send request to api
	try {
		//  Send the HTTP DELETE request

		// dev
		//let url = "http://localhost:3000/api/deleteStudentCourse/";

		// live
		let url = "https://sdev-module5-tutorial.onrender.com/api/deleteStudentCourse/";

		const response = await fetch(url + id, {
		method: 'DELETE',
		headers: {
			  'Content-Type': 'application/json'
			  // Add Authorization tokens here if required
			}
		});

		if (response.ok) {
			// redirect
			window.location.href='student_schedule.html';
		} else {
			// error ... 
		}

	} catch (err) {
		// error
	}
});