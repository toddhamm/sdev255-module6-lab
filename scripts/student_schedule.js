// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	// get courses in student's schedule, load into elements
	try {

		// student id from local storage
		const studentId = localStorage.getItem('userId');

		// response from server

		// local host / dev
		const response = await fetch("http://localhost:3000/api/studentCourses/" + studentId);
		// to run on local server: npx http-server -p 8080

		// live
		//const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/studentCourses/" + studentId);

		if (!response.ok) {
		    throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// course list as promise
		const courses = await response.json();

		//console.log(courses);

		// check if empty
		if (Object.keys(courses).length === 0) {
			// it is empty
		    console.log("JSON object is empty");

		    // show error
		    document.getElementById('error').style.display='block';

		} else {
			// not empty

			// get the ul element
			const ul = document.querySelector('#ul-courses');

			// get course name from related table
			courses.forEach(course => {

				// this is from a google example showing how to extract the course name value from the promise

				// get the course data, then run promise chain
				
				// dev
				// let url = 'http://localhost:3000/api/courses/';
				
				// live
				let url = 'https://sdev-module5-tutorial.onrender.com/api/courses/';

				// dev
				fetch(url + course.courseId)
				.then(response => response.json()) // Extracts the JSON promise
				  .then(jsonData => {

				    // create li element
					const li = document.createElement('li');

					// add course name to li text content
				    li.textContent = `${jsonData[0].name} - `;

				    // create a tag
					const a = document.createElement("a");

					a.href = "drop_course.html?id="+course._id;
					a.textContent = "Drop";
					a.classList.add('drop-link');
					//a.classList.add('btn');
					//a.classList.add('btn-primary');

					// add btn to li
					li.appendChild(a);

					// append to the ul
					ul.append(li);

				  })
				  .catch(error => console.error("Error:", error)); // error

			});
		}

	} catch (error) {
		console.error('Failed to fetch student courses:', error);
	}

	// deleting a student-course record does not work in this script; see drop_course.js

});